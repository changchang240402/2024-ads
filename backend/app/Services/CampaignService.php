<?php

namespace App\Services;

use App\Repositories\Campaign\CampaignRepository;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use DateTime;

class CampaignService
{
    private const PAGINATE_PER_PAGE = 15;
    protected CampaignRepository $campaignRepository;

    public function __construct(CampaignRepository $campaignRepository)
    {
        $this->campaignRepository = $campaignRepository;
    }

    /**
     * @param int $userId
     * @param int $page
     * @param string $name
     * @param DateTime $datetime
     * @param string $sort
     * @return mixed
    */
    public function getCampaignsByUserId(
        int $userId, 
        int $page,
        string $name = null,
        string $datetime = null,
        string $sort = null)
    {
        $campaigns = $this->campaignRepository->getCampaignsByUserId($userId);
        if ($campaigns->count() > 0){
            if ($name) {
                $campaigns = $this->filterByName($campaigns,$name);
            }
            if ($datetime) {
                $campaigns = $this->filterByDatetime($campaigns,$datetime);
            }
            if ($sort) {
                $campaigns = $this->filterBySort($campaigns,$sort);
            }
        }
        if ($campaigns->isEmpty()) {
            throw new Exception('Campaign not found');
        }
        $perPage = self::PAGINATE_PER_PAGE;
        $paginatedCampaigns = new LengthAwarePaginator(
            $campaigns->forPage($page, $perPage),
            $campaigns->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginatedCampaigns;
    }

    /**
     * @param mixed $campaigns
     * @param string $nameCondition
     * @return mixed
     */

    private function filterByName($campaigns, $name){
         return $name ? $campaigns->filter(function ($campaign) use ($name){
                return Str::contains($campaign['campaign_name'], $name);
         }) : $campaigns;
    }

    /**
     * @param mixed $campaigns
     * @param string $datetime
     * @return mixed
     */

     private function filterByDatetime($campaigns, $datetime){
        $datetime = new DateTime($datetime);
        $time = $datetime->format('Y-m-d H:i:s');
        return $time ? $campaigns->filter(function ($campaign) use ($time){
            if($campaign['start_date'] <= $time && $campaign['end_date'] >= $time){
                return true;
            }
            return false;
        }) : $campaigns;
    }

    /**
     * @param mixed $campaigns
     * @param string $sort
     * @return mixed
     */

     private function filterBySort($campaigns, $sort){
        if ($sort === 'asc') {
            return $campaigns->sortBy('budget');
        } elseif ($sort === 'desc') {
            return $campaigns->sortByDesc('budget');
        }
    }

    /**
     * @param int $userId
     * @param int $page
     * @param array $array
     * @return mixed
    */
    public function filterCampaign(int $userId, int $page, array $array){
        $name = null;
        $datetime = null;
        $sort = null;
        if (isset($array['name'])) {
            $name = $array['name'];
        }
        if (isset($array['datetime'])) {
            $datetime = $array['datetime'];
        }
        if (isset($array['sort'])) {
            $sort = $array['sort'];
        }
        return $this->getCampaignsByUserId($userId,$page,$name,$datetime,$sort);

    }
}
