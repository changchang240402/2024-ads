<?php

namespace App\Repositories\Campaign;

use App\Repositories\RepositoryInterface;
use App\Models\Campaign;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CampaignRepositoryInterface extends RepositoryInterface
{
    /**
     * get list campaigns by user
     * @param int $userId
     * @return mixed
     */
    public function getCampaignsByUserId($userId);

    /**
     * Total campaigns by user
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalCampaignByUserId($userId, $currentYear, $currentMonth);

    /**
     * get detail campaign by id
     * @param int $userId
     * @param int $campignId
     * @return mixed
     */
    public function getCampaignsById($userId, $campignId);

    /**
     * Check the campaign to update the status
     * @param int $campignId
     * @param string $now
     * @return mixed
     */
    public function checkCampaignUpdateStatus($campignId, $now);
}
