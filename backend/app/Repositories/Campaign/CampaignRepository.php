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
     * @param int $userId id of user login
     * @return LengthAwarePaginator
    */
    public function getCampaignsByUserId($userId): LengthAwarePaginator
    {
        return $this->model->with('groups.advertisements') 
                           ->withCount("groups")
                           ->where('user_id', $userId) 
                           ->orderBy('created_at', 'desc')
                           ->map(function ($campaign) {
                               $totalAds = $campaign->groups->flatMap(function ($group) {
                                   return $group->advertisements;
                               })->count();
        
                               return [
                                   'campaign_id' => $campaign->id,
                                   'campaign_name' => $campaign->campaign_name,
                                   'start_date' => $campaign->start_date,
                                   'end_date'=> $campaign->end_date,
                                   'budget' => $campaign->budget,
                                   'total_group'=> $campaign->total_group,
                                   'total_ads' => $totalAds,
                               ];
                           })
                           ->paginate(config('constants.PAGINATE_PER_PAGE'));
    }

}