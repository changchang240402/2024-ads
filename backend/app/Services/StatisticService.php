<?php

namespace App\Services;

use App\Repositories\Advertisement\AdvertisementRepository;
use App\Repositories\Campaign\CampaignRepository;
use App\Repositories\Group\GroupRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use DateTime;

class StatisticService
{
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
     * @return mixed
    */
    public function getStatisticByUserId(int $userId)
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh');
        $currentYear = $now->year;
        $currentMonth = $now->month;
        $total_campaign = $this->campaignRepository->totalCampaignByUserId($userId, $currentYear, $currentMonth);
        if (!$total_campaign) {
            throw new Exception('Get total campaign failed');
        }
        $total_group = $this->groupRepository->totalGroupByUserId($userId, $currentYear, $currentMonth);
        if (!$total_group) {
            throw new Exception('Get total group failed');
        }
        $total_ads = $this->advertisementRepository->totalAdvertisementByUserId($userId, $currentYear, $currentMonth);
        if (!$total_group) {
            throw new Exception('Get total ads failed');
        }
        $total_ads_paused = $this->advertisementRepository->totalAdsPausedByUserId($userId, $currentYear, $currentMonth);
        if (!$total_ads_paused) {
            throw new Exception('Get total ads paused failed');
        }
        return [
            'campaign' => $total_campaign,
            'group' => $total_group,
            'ads' => $total_ads,
            'ads_paused' => $total_ads_paused,
        ];
    }

    /**
     * Statistics ads by month
     * @param int $userId
     * @param int $month
     * @param int $year
     * @return mixed
    */
    private function getStatisticsAdsByMonnth($userId, $currentYear, $currentMonth)
    {
        $startDate = $currentMonth ;
        $moths = [];
    }
}
