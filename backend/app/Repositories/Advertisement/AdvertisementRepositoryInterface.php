<?php

namespace App\Repositories\Advertisement;

use App\Repositories\RepositoryInterface;
use App\Models\Advertisement;

interface AdvertisementRepositoryInterface extends RepositoryInterface
{
    /**
     * Total ads by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalAdvertisementByUserId($userId, $currentYear, $currentMonth);

    /**
     * Statistics ads by month
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalAdsMonth($userId, $currentYear, $currentMonth);

    /**
     * show list ads by group ids
     * @param int $userId
     * @param array $groupIds
     * @return mixed
     */
    public function getAdsByGroupIds($userId, $groupIds);

    public function getAllAds($userId, $page, $per_page);

    public function getTopAdsByUsers($userId, $limit);

    public function getTotalAdsByPlatform($userId);
}
