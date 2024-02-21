<?php

namespace App\Repositories\Advertisement;

use App\Models\Advertisement;
use App\Repositories\BaseRepository;
use Carbon\Carbon;

class AdvertisementRepository extends BaseRepository implements AdvertisementRepositoryInterface
{
    public function getModel()
    {
        return Advertisement::class;
    }

    /**
     * Total ads by user
     * @param int $userId
     * @return mixed
    */
    public function totalAdvertisementByUserId($userId){
        $ads = $this->model->where('user_id', $userId);
        $total = $ads->count();
        $now = Carbon::now('Asia/Ho_Chi_Minh');
        $currentYear = $now->year;
        $currentMonth = $now->month;
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
     * @return mixed
    */
    public function totalAdsPausedByUserId($userId){
        $ads = $this->model->where('user_id', $userId)->where('status','=',config('constants.STATUS.paused'));
        $total = $ads->count();
        $now = Carbon::now('Asia/Ho_Chi_Minh');
        $currentYear = $now->year;
        $currentMonth = $now->month;
        $total_now =  $ads->whereYear('update_at', $currentYear)
                          ->whereMonth('update_at', $currentMonth)->count();
        return [
            'total_advertisement' => $total,
            'total_advertisement_now' => $total_now,
        ];
    }

    /**
     * Statistics ads by month
     * @param int $userId
     * @return mixed
    */
    public function totalAdsMonth($userId){
        $months = range(1, 12);
        $monthNames = array_map(function ($month) {
            return date('F', mktime(0, 0, 0, $month, 1));
        }, $months);
        
    }


}
