<?php

namespace App\Repositories\Advertisement;

use App\Repositories\RepositoryInterface;
use App\Models\Advertisement;

interface AdvertisementRepositoryInterface extends RepositoryInterface
{
    /**
     * Total ads by user
     * @param int $userId
     * @return mixed
    */
    public function totalAdvertisementByUserId($userId);

    /**
     * Statistics ads by month
     * @param int $userId
     * @return mixed
    */
    public function totalAdsMonth($userId);
}
