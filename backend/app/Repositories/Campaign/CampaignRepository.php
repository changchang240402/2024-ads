<?php

namespace App\Repositories\Campaign;

use App\Models\Campaign;
use App\Repositories\BaseRepository;
use App\Repositories\Group\GroupRepository;
use Carbon\Carbon;
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
    /**
     * Total campaigns by user
     * @param int $userId
     * @return mixed
    */
    public function totalCampaignByUserId($userId){
        $campagns = $this->model->where('user_id', $userId);
        $total = $campagns->count();
        $now = Carbon::now('Asia/Ho_Chi_Minh');
        $currentYear = $now->year;
        $currentMonth = $now->month;
        $total_now =  $campagns->whereYear('created_at', $currentYear)
                               ->whereMonth('created_at', $currentMonth)->count();
        return [
            'total_campaign' => $total,
            'total_campaign_now' => $total_now,
        ];
    }
}
