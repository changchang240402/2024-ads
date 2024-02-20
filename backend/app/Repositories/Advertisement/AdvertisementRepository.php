<?php

namespace App\Repositories\Advertisement;

use App\Models\Advertisement;
use App\Repositories\BaseRepository;

class AdvertisementRepository extends BaseRepository implements AdvertisementRepositoryInterface
{
    public function getModel()
    {
        return Advertisement::class;
    }
}
