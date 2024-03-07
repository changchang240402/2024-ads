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
            ->with([
                'campaign' => function ($query) {
                    $query->select('id', 'campaign_name');
                }
            ])
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

    /**
     * array group by campaign id
     * @param int $campignId
     * @return mixed
     */
    public function getGroupByCampaignId($campignId)
    {
        return $this->model->where('campaign_id', '=', $campignId)->get('id');
    }

    /**
     * get detail group by id
     * @param int $userId
     * @param int $groupId
     * @return mixed
     */
    public function getGroupsById($userId, $groupId)
    {
        return $this->model->where('id', '=', $groupId)
            ->withCount(['advertisements as total_advertisement'])
            ->whereHas('campaign', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with([
                'campaign' => function ($query) {
                    $query->select('id', 'campaign_name', 'budget', 'start_date', 'end_date', 'target_audience');
                }
            ])
            ->firstOrFail();
    }

    /**
     * update Status Group Of Campaign
     * @param array $groupIds
     * @param int $status
     * @return mixed
     */
    public function updateStatusGroupOfCampaign($groupIds, $status)
    {
        return $this->model->whereIn('id', $groupIds)->update(['status' => $status]);
    }
}
