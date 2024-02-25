<?php

namespace App\Repositories\Platform;

use App\Repositories\RepositoryInterface;
use App\Models\Platform;

interface PlatformRepositoryInterface extends RepositoryInterface
{

    /**
     * Total groups by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
    */
    public function totalAdsByPlatform($userId, $currentYear, $currentMonth);
}
