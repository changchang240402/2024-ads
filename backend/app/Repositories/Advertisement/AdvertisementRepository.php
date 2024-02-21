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
        $total_now =  $ads->whereYear('created_at', $currentYear)
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
        $ads = $this->model->where('user_id', $userId);
        $ads_paused_mounth = $ads->where('status', '=', config('constants.STATUS.paused'))
                                 ->whereYear('updated_at', $year)
                                 ->whereMonth('updated_at', $month)->count(); //Ads stopped working that month
        $ads_mounth = $ads->where(function ($query) use ($year, $month) {
            $query->whereYear('updated_at', '<', $year)
                  ->orWhere(function ($query) use ($year, $month) {
                      $query->whereYear('updated_at', $year)
                            ->whereMonth('updated_at', '<=', $month);
                  });
        });
        $total_ads = $ads_mounth->count(); //total number of ads from that month forward
        $ads_paused = $ads_mounth->where('status', '=', config('constants.STATUS.paused'))->count(); //Total number of ads that stopped working from that month forward
        $ads_active_mount = $total_ads - $ads_paused;// Ads are still active that month
        return [
            'month' => date('F', mktime(0, 0, 0, $month, 1)),
            'year' => $year,
            'ads_paused_mounth' => $ads_paused_mounth,
            'ads_active_mount' => $ads_active_mount
        ];
    }
}
