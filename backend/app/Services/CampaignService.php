<?php

namespace App\Services;

use App\Services\AdvertisementService;
use App\Repositories\Campaign\CampaignRepository;
use App\Repositories\Group\GroupRepository;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use DateTime;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CampaignService
{
    private const PAGINATE_PER_PAGE = 10;
    protected CampaignRepository $campaignRepository;

    protected GroupRepository $groupRepository;

    protected AdvertisementService $advertisementService;

    public function __construct(
        CampaignRepository $campaignRepository,
        GroupRepository $groupRepository,
        AdvertisementService $advertisementService
    ) {
        $this->campaignRepository = $campaignRepository;
        $this->groupRepository = $groupRepository;
        $this->advertisementService = $advertisementService;
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
            $campaignName = strtolower($campaign['campaign_name']);
            $searchKeyword = strtolower($name);
            return Str::contains($campaignName, $searchKeyword);
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
     * @param int $campignId
     * @param int $page
     * @return mixed
     */
    public function getCampaignsById($userId, $campignId, $page)
    {
        $campaign = $this->campaignRepository->getCampaignsById($userId, $campignId);
        if (!$campaign) {
            throw new Exception('Campaign not found');
        }
        $groups = $this->groupRepository->getGroupByCampaignId($campignId);
        $totalGroups = $groups->count();
        if ($totalGroups > 0) {
            $groupIds = $groups->toArray();
            $ads = $this->advertisementService->getAdsByGroupIds($userId, $groupIds, $page);
            return [
                'campaign' => $campaign,
                'total_group' => $totalGroups,
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
     * Update new campign
     *
     * @param int $id
     * @param mixed $campaign
     * @return mixed
     */
    public function updateCampaign($id, $campaign)
    {
        $time = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $userId = auth()->id();
        $campaignOld = $this->campaignRepository->getCampaignsById($userId, $id);
        if (!$campaignOld) {
            throw new Exception('This campaign does not exist');
        }
        DB::beginTransaction();
        try {
            $data = $this->campaignRepository->update($id, $campaign);
            if (is_array($data) && (isset($data['new']['start_date']) || isset($data['new']['end_date']))) {
                $checkCampaign = $this->campaignRepository->checkCampaignUpdateStatus($id, $time);
                $status = $checkCampaign ? config('constants.STATUS.active') : config('constants.STATUS.paused');
                $groups = $this->groupRepository->getGroupByCampaignId($id);
                if ($groups->count() > 0) {
                    $groupIds = $groups->toArray();
                    $this->groupRepository->updateStatusGroupOfCampaign($groupIds, $status);
                    $this->advertisementService->updateStatusAdsByCampaign($groupIds, $status);
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
        DB::commit();
        return $data;
    }
}
