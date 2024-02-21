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
     * @return mixed
    */
    public function totalGroupByUserId($userId);
}
