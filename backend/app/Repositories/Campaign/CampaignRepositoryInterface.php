<?php

namespace App\Repositories\Campaign;

use App\Repositories\RepositoryInterface;
use App\Models\Campaign;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CampaignRepositoryInterface extends RepositoryInterface
{
    /**
     * @param int $userId
     * @return mixed
    */
    public function getCampaignsByUserId($userId);
}
