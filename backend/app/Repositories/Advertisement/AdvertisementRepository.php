<?php

namespace App\Repositories\Advertisement;

use App\Models\Advertisement;
use App\Repositories\BaseRepository;
use Exception;

class AdvertisementRepository extends BaseRepository implements AdvertisementRepositoryInterface
{
    public function getModel()
    {
        return Advertisement::class;
    }

    /**
     * Total ads by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalAdvertisementByUserId($userId, $currentYear, $currentMonth)
    {
        $ads = $this->model->where('user_id', $userId);
        $total = $ads->count();
        $total_now = $ads->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)->count();
        return [
            'total_advertisement' => $total,
            'total_advertisement_now' => $total_now,
        ];
    }

    /**
     * Total ads by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalAdsPausedByUserId($userId, $currentYear, $currentMonth)
    {
        $ads = $this->model->where('user_id', $userId)->where('status', '=', config('constants.STATUS.paused'));
        $total = $ads->count();
        $total_now = $ads->whereYear('updated_at', $currentYear)
            ->whereMonth('updated_at', $currentMonth)->count();
        return [
            'total_ads_paused' => $total,
            'total_ads_paused_now' => $total_now,
        ];
    }

    /**
     * Statistics ads by month
     * @param int $userId
     * @param int $month
     * @param int $year
     * @return mixed
     */
    public function totalAdsMonth($userId, $month, $year)
    {
        $ads_paused_month = $this->model->where('user_id', $userId)->where('status', '=', config('constants.STATUS.paused'))
            ->whereYear('updated_at', $year)
            ->whereMonth('updated_at', $month)->count(); //Ads stopped working that month
        $ads_month = $this->model->where('user_id', $userId)->where(function ($query) use ($year, $month) {
            $query->whereYear('created_at', '<', $year)
                ->orWhere(function ($query) use ($year, $month) {
                    $query->whereYear('created_at', $year)
                        ->whereMonth('created_at', '<=', $month);
                });
        });
        $total_ads = $ads_month->count(); //total number of ads from that month forward
        $ads_paused = $ads_month->where('status', '=', config('constants.STATUS.paused'))->count(); //Total number of ads that stopped working from that month forward
        $ads_active_month = $total_ads - $ads_paused; // Ads are still active that month
        return [
            'month' => date('F', mktime(0, 0, 0, $month, 1)),
            'year' => $year,
            'ads_paused_month' => $ads_paused_month,
            'ads_active_month' => $ads_active_month,
        ];
    }

    /**
     * show list ads by group ids
     * @param int $userId
     * @param array $groupIds
     * @return mixed
     */
    public function getAdsByGroupIds($userId, $groupIds)
    {
        return $this->model->where('user_id', $userId)
            ->whereIn('adgroup_id', $groupIds)
            ->with([
                'advertisementDetails' => function ($query) {
                    $query->select('ad_id', 'platform_id')->distinct('platform_id');
                }
            ])
            ->with([
                'advertisementType' => function ($query) {
                    $query->select('id', 'ad_type_name');
                },
                'group' => function ($query) {
                    $query->select('id', 'adgroup_name');
                }
            ])
            ->get()
            ->map(function ($ad) {
                $platformsCount = $ad->advertisementDetails->count();
                $ad->platforms_count = $platformsCount;
                unset($ad->advertisementDetails);
                return $ad;
            });
    }

    public function getAllAds($userId, $validated)
    {
        try {
            $per_page = $validated['per_page'] ?? 5;
            $page = $validated['page'] ?? 1;
            $order = $validated['order'];
            $sortBy = $validated['sortBy'];
            $searchBy = $validated['searchBy'];
            $search = $validated['search'];
            $date = $validated['date'];
            $status = $validated['status'];

            $ads = $this->model->with('advertisementType')
                ->with(['advertisementDetails'])
                ->where('user_id', $userId);

            if ($order && $sortBy) {
                $ads = $ads->orderBy($sortBy, $order);
            }

            if ($searchBy && $search) {
                $ads = $ads->where($searchBy, 'like', '%' . $search . '%');
            }

            if ($date) {
                $ads = $ads->whereDate('created_at', $date);
            }

            if ($status) {
                if ($status === 'active') {
                    $status = config('constants.STATUS.active');
                } else {
                    $status = config('constants.STATUS.paused');
                }
                
                $ads = $ads->where('status', $status);
            }

            $ads = $ads->paginate($per_page, ['*'], 'page', $page);


            $totalPage = ceil($ads->total() / $per_page);

            $pagination = [
                'per_page' => $ads->perPage(),
                'current_page' => $ads->currentPage(),
                'total_pages' => $totalPage,
                'total_result' => $ads->total(),
            ];

            return [
                'ads' => $ads->items(),
                'pagination' => $pagination,
            ];
        } catch (\Throwable $th) {
            throw new Exception($th->getMessage(), 500);
        }
    }

    public function getTopAdsByUsers($userId, $limit)
    {
        $ads = $this->model->join('advertisement_details', 'advertisements.id', '=', 'advertisement_details.ad_id')
            ->select('advertisements.id', 'advertisements.ad_name', 'advertisements.ad_content', 'advertisements.destination_url', 'advertisements.kpi', 'advertisement_details.conversion_rate')
            ->where('advertisements.user_id', $userId)
            ->orderByDesc('advertisement_details.conversion_rate')
            ->distinct('advertisements.id')
            ->take($limit)
            ->get();

        return $ads->unique('id');
    }

    public function getTotalAdsByPlatform($userId)
    {
        $data = $this->model->join('advertisement_details', 'advertisements.id', '=', 'advertisement_details.ad_id')
            ->join('platforms', 'advertisement_details.platform_id', '=', 'platforms.id')
            ->select('platforms.platform_name')
            ->where('advertisements.user_id', $userId)
            ->groupBy('platforms.platform_name')
            ->selectRaw('platforms.platform_name, count(*) as total_ads')
            ->get();

        $totals = [];
        foreach ($data as $item) {
            $totals[$item->platform_name] = $item->total_ads;
        }

        return $totals;
    }
}
