<?php

namespace App\Repositories\Group;

use App\Repositories\RepositoryInterface;
use App\Models\Group;

interface GroupRepositoryInterface extends RepositoryInterface
{
    /**
     * @param int $userId
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
     * @param int $campignId
     * @return mixed
     */
    public function getGroupByCampaignId($campignId);

    /**
     * get detail group by id
     * @param int $userId
     * @param int $groupId
     * @return mixed
     */
    public function getGroupsById($userId, $groupId);
}
