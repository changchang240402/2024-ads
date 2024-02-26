<?php

namespace App\Repositories\Group;

use App\Repositories\RepositoryInterface;
use App\Models\Group;

interface GroupRepositoryInterface extends RepositoryInterface
{
    /**
     * @param int $userId id of user login
     * @return mixed
     */
    public function getGroupsByUserId($userId);

    /**
     * Total groups by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalGroupByUserId($userId, $currentYear, $currentMonth);

    /**
     * array group by campaign id
     * @param int $campaign_id
     * @return mixed
     */
    public function getGroupByCampaignId($campaign_id);
}
