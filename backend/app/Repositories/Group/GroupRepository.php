<?php

namespace App\Repositories\Group;

use App\Models\Group;
use App\Repositories\BaseRepository;
use App\Repositories\CampaignRepository;

class GroupRepository extends BaseRepository implements GroupRepositoryInterface
{
    public function getModel()
    {
        return Group::class;
    }

    /**
     * @param int $userId id of user login
     * @return mixed
     */
    public function getGroupsByUserId($userId)
    {
        return $this->model->withCount(['advertisements as total_advertisement'])
            ->whereHas('campaign', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with(['campaign' => function ($query) {
                $query->select('id', 'campaign_name');
            }])
            ->get();
    }

    /**
     * Total groups by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalGroupByUserId($userId, $currentYear, $currentMonth)
    {
        $group = $this->model->with("campaign")
            ->whereHas('campaign', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });
        $total = $group->count();
        $total_now = $group->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)->count();
        return [
            'total_group' => $total,
            'total_group_now' => $total_now,
        ];
    }
}
