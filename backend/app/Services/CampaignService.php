<?php

namespace App\Services;

use App\Repositories\Advertisement\AdvertisementRepository;
use App\Repositories\Campaign\CampaignRepository;
use App\Repositories\Group\GroupRepository;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use DateTime;

class CampaignService
{
    private const PAGINATE_PER_PAGE = 15;
    protected CampaignRepository $campaignRepository;

    protected GroupRepository $groupRepository;

    protected AdvertisementRepository $advertisementRepository;

    public function __construct(
        CampaignRepository $campaignRepository,
        GroupRepository $groupRepository,
        AdvertisementRepository $advertisementRepository
    ) {
        $this->campaignRepository = $campaignRepository;
        $this->groupRepository = $groupRepository;
        $this->advertisementRepository = $advertisementRepository;
    }

    /**
     * @param int $userId
     * @param int $page
     * @param string $name
     * @param string $datetime
     * @param string $sort
     * @return mixed
     */
    public function getCampaignsByUserId(
        int $userId,
        int $page,
        string $name = null,
        string $datetime = null,
        string $sort = null
    ) {
        $campaigns = $this->campaignRepository->getCampaignsByUserId($userId);
        if ($campaigns->count() > 0) {
            if ($name) {
                $campaigns = $this->filterByName($campaigns, $name);
            }
            if ($datetime) {
                $campaigns = $this->filterByDatetime($campaigns, $datetime);
            }
            if ($sort) {
                $campaigns = $this->filterBySort($campaigns, $sort);
            }
        }
        if ($campaigns->isEmpty()) {
            throw new Exception('Campaign not found');
        }
        $perPage = self::PAGINATE_PER_PAGE;
        $campaignsPerPage = $campaigns->forPage($page, $perPage);
        $paginatedCampaigns = new LengthAwarePaginator(
            $campaignsPerPage->values()->all(),
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

    private function filterByName($campaigns, $name)
    {
        return $name ? $campaigns->filter(function ($campaign) use ($name) {
            return Str::contains($campaign['campaign_name'], $name);
        }) : $campaigns;
    }

    /**
     * @param mixed $campaigns
     * @param string $datetime
     * @return mixed
     */

    private function filterByDatetime($campaigns, $datetime)
    {
        $datetime = new DateTime($datetime);
        $time = $datetime->format('Y-m-d H:i:s');
        return $time ? $campaigns->filter(function ($campaign) use ($time) {
            if ($campaign['start_date'] <= $time && $campaign['end_date'] >= $time) {
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

    private function filterBySort($campaigns, $sort)
    {
        if ($sort === 'asc') {
            return $campaigns->sortBy('budget');
        } elseif ($sort === 'desc') {
            return $campaigns->sortByDesc('budget');
        }
    }

    /**
     * @param int $userId
     * @param int $page
     * @param array $filter
     * @return mixed
     */
    public function filterCampaign(int $userId, int $page, array $filter)
    {
        $name = null;
        $datetime = null;
        $sort = null;
        if (isset($filter['name'])) {
            $name = $filter['name'];
        }
        if (isset($filter['datetime'])) {
            $datetime = $filter['datetime'];
        }
        if (isset($filter['sort'])) {
            $sort = $filter['sort'];
        }
        return $this->getCampaignsByUserId($userId, $page, $name, $datetime, $sort);
    }

    /**
     * get detail campaign by id
     * @param int $userId
     * @param int $campaign_id
     * @return mixed
     */
    public function getCampaignsById($userId, $campaign_id)
    {
        $campaign = $this->campaignRepository->getCampaignsById($userId, $campaign_id);
        if ($campaign->isEmpty()) {
            throw new Exception('Campaign not found');
        }
        $groups = $this->groupRepository->getGroupByCampaignId($campaign_id);
        $totalGroups = $groups->count();
        if ($groups) {
            $groupIds = $groups->toArray();
            $ads = $this->advertisementRepository->getAdsByCampaignId($userId, $groupIds);
            $totalAds = $ads->count();
            return [
                'campaign' => $campaign,
                'total_group' => $totalGroups,
                'total_ads' => $totalAds,
                'ads' => $ads
            ];
        }
        return [
            'campaign' => $campaign,
            'total_group' => $totalGroups,
            'total_ads' => 0,
            'ads' => []
        ];

    }

    /**
     * Create new campign 
     *
     * @param mixed $campaign
     * @return mixed
     */

    public function createCampaign($campaign)
    {
        $campaign['user_id'] = auth()->id();
        try {
            $data = $this->campaignRepository->create($campaign);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $data;
    }
    /**
     * Create new campign 
     *
     * @param int $id
     * @param mixed $campaign
     * @return mixed
     */
    public function updateCampaign($id, $campaign)
    {
        $userId = auth()->id();
        $campaignOld = $this->campaignRepository->getCampaignsById($userId,$id);
        if ($campaignOld->isEmpty()) {
            throw new Exception('This campaign does not exist');
        }
        try {
            $data = $this->campaignRepository->update($id, $campaign);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $data;
    }
}
