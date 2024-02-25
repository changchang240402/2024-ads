<?php

namespace App\Services;

use App\Repositories\Advertisement\AdvertisementRepository;
use App\Repositories\Campaign\CampaignRepository;
use App\Repositories\Group\GroupRepository;
use App\Repositories\Platform\PlatformRepository;
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

    protected PlatformRepository $platformRepository;

    public function __construct(
        CampaignRepository $campaignRepository,
        GroupRepository $groupRepository,
        AdvertisementRepository $advertisementRepository,
        PlatformRepository $platformRepository
    ) {
        $this->campaignRepository = $campaignRepository;
        $this->groupRepository = $groupRepository;
        $this->advertisementRepository = $advertisementRepository;
        $this->platformRepository = $platformRepository;
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
        $statistic_ads = $this->getStatisticsAdsByMonnth($userId, $currentYear, $currentMonth);
        if (!$statistic_ads) {
            throw new Exception('Get statistic ads paused failed');
        }
        $platform_ads = $this->platformRepository->totalAdsByPlatform($userId, $currentYear, $currentMonth);
        return [
            'campaign' => $total_campaign,
            'group' => $total_group,
            'ads' => $total_ads,
            'ads_paused' => $total_ads_paused,
            'statistic_ads'=> $statistic_ads,
            'platform_ads' => $platform_ads
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
        $months = [];
        for ($i = 1; $i <= 12; $i++) {
            $month = $currentMonth + $i;
            $year = $currentYear - 1;
            if ($month > 12) {
                $month = $month % 12;
                $year += floor(($currentMonth + $i - 1) / 12);
            }
            $months[] = [
                'month' => $month,
                'year' => $year,
            ];
        }
        $data = [];
        foreach ($months as $month) {
            $data[] = $this->advertisementRepository->totalAdsMonth($userId,$month['month'],$month['year']);
        }
        return $data;
    }
}
