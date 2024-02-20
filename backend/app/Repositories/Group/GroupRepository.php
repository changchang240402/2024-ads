<?php

namespace App\Repositories\Group;

use App\Models\Group;
use App\Repositories\BaseRepository;
use App\Repositories\CampaignRepository;

class GroupRepository extends BaseRepository implements GroupRepositoryInterface
{
    protected CampaignRepository $campaignRepository;

    public function __construct(CampaignRepository $campaignRepository)
    {
        $this->campaignRepository = $campaignRepository;
    }

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
        return $this->model::with("campaign")
            ->with("advertisements")
            ->withCount(['advertisements as total_advertisement'])
            ->select('id', 'adgroup_name', 'campaign_id', 'campaign.campaign_name', 'bidding_strategy', 'target_keywords', 'ad_schedule', 'total_advertisement', 'status')
            ->whereHas('campaign', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->paginate(self::PAGINATE_PER_PAGE);
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
