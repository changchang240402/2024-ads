<?php

namespace App\Repositories\Advertisement;

use App\Models\Advertisement;
use App\Repositories\BaseRepository;

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
     * show list ads by campaign id
     * @param int $userId
     * @param array $groupIds
     * @return mixed
     */
    public function getAdsByCampaignId($userId, $groupIds)
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

    public function getAllAds($userId, $page, $per_page)
    {
        $ads = $this->model->with('advertisementType')->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate($per_page, ['*'], 'page', $page);

        $totalPage = ceil($ads->total() / $per_page);
        $pagination = [
            'per_page' => $ads->perPage(),
            'current_page' => $ads->currentPage(),
            'total_pages' => $totalPage,
        ];

        return [
            'ads' => $ads->items(),
            'pagination' => $pagination,
            'total_result' => $ads->total(),
        ];
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
}
