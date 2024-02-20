<?php

namespace App\Repositories\Campaign;

use App\Repositories\RepositoryInterface;
use App\Models\Campaign;

interface CampaignRepositoryInterface extends RepositoryInterface
{
    /**
     * @param int $userId id of user login
     * @return mixed
    */
    public function getCampaignByUserId($userId);

}
