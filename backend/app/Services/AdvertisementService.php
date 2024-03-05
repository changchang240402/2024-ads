<?php

namespace App\Services;

use App\Repositories\Advertisement\AdvertisementRepository;
use App\Repositories\Advertisement\AdvertisementRepositoryInterface;
use App\Repositories\Campaign\CampaignRepository;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use DateTime;

class AdvertisementService
{
    protected $adsRepository;

    public function __construct(AdvertisementRepository $adsRepository)
    {
        $this->adsRepository = $adsRepository;
    }

    public function getAllAds($userId, $validated)
    {
        return $this->adsRepository->getAllAds($userId, $validated);
    }

    public function getTopAdsByUsers($userId, $limit)
    {
        return $this->adsRepository->getTopAdsByUsers($userId, $limit);
    }

    public function getTotalAdsByPlatform($userId)
    {
        return $this->adsRepository->getTotalAdsByPlatform($userId);
    }

    public function getWarningBadKpiAdsNotifications($userId)
    {
        return $this->adsRepository->getWarningBadKpiAdsNotifications($userId);
    }
}
