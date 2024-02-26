<?php

namespace App\Repositories\Campaign;

use App\Models\Campaign;
use App\Repositories\BaseRepository;

class CampaignRepository extends BaseRepository implements CampaignRepositoryInterface
{
    public function getModel()
    {
        return Campaign::class;
    }

    /**
     * @param int $userId
     * @return mixed
     */
    public function getCampaignsByUserId($userId)
    {
        return $this->model->with('groups.advertisements')
            ->withCount(['groups as total_group'])
            ->where('user_id', $userId)
            ->get()
            ->map(function ($campaign) {
                $totalAds = $campaign->groups->flatMap(function ($group) {
                    return $group->advertisements;
                })->count();
                return [
                    'id' => $campaign->id,
                    'campaign_name' => $campaign->campaign_name,
                    'start_date' => $campaign->start_date,
                    'end_date' => $campaign->end_date,
                    'budget' => $campaign->budget,
                    'total_group' => $campaign->total_group,
                    'total_ads' => $totalAds,
                ];
            });
    }

    /**
     * Total campaigns by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalCampaignByUserId($userId, $currentYear, $currentMonth)
    {
        $campagns = $this->model->where('user_id', $userId);
        $total = $campagns->count();
        $total_now = $campagns->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)->count();
        return [
            'total_campaign' => $total,
            'total_campaign_now' => $total_now,
        ];
    }

    /**
     * get detail campaign by id
     * @param int $userId
     * @param int $campaign_id
     * @return mixed
     */
    public function getCampaignsById($userId, $campaign_id)
    {
        return $this->model->where('user_id', $userId)
        ->where('id', '=', $campaign_id)
        ->select('id', 'campaign_name', 'campaign_goal', 'budget', 'start_date', 'end_date', 'ad_message', 'target_audience', 'distribution_strategy')
        ->get();
    }
}
