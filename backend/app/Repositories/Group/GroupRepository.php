<?php

namespace App\Repositories\Group;

use App\Models\Campaign;
use App\Models\Group;
use App\Repositories\BaseRepository;
use App\Repositories\CampaignRepository;
use Carbon\Carbon;

class GroupRepository extends BaseRepository implements GroupRepositoryInterface
{
    public function getModel()
    {
        return Group::class;
    }

    /**
     * get list group by user
     * @param int $userId 
     * @return mixed
    */
    public function getGroupsByUserId($userId){
        return $this->model::with("campaign")
                            ->with("advertisements")
                            ->withCount("advertisements")
                            ->where("campaign.user_id", $userId)->get();
    }

    /**
     * Total groups by user
     * @param int $userId
     * @return mixed
    */
    public function totalGroupByUserId($userId){
        $group = $this->model->with("campaign")->where('campaign.user_id', $userId);
        $total = $group->count();
        $now = Carbon::now('Asia/Ho_Chi_Minh');
        $currentYear = $now->year;
        $currentMonth = $now->month;
        $total_now = $group->whereYear('created_at', $currentYear)
                           ->whereMonth('created_at', $currentMonth)->count();
        return [
            'total_group' => $total,
            'total_group_now' => $total_now,
        ];
    }
}
