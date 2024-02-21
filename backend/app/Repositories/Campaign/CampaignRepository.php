<?php

namespace App\Repositories\Campaign;

use App\Models\Campaign;
use App\Repositories\BaseRepository;
use App\Repositories\Group\GroupRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
                                   'campaign_id' => $campaign->id,
                                   'campaign_name' => $campaign->campaign_name,
                                   'start_date' => $campaign->start_date,
                                   'end_date' => $campaign->end_date,
                                   'budget' => $campaign->budget,
                                   'total_group' => $campaign->total_group,
                                   'total_ads' => $totalAds,
                               ];
                           });
    }
}
