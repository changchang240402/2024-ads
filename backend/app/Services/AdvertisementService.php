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
    private const PAGINATE_PER_PAGE = 5;
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

    public function getAdsByGroupIds($userId, $groupIds, $page)
    {
        $ads = $this->adsRepository->getAdsByGroupIds($userId, $groupIds);
        $perPage = self::PAGINATE_PER_PAGE;
        $adsPerPage = $ads->forPage($page, $perPage);
        $paginatedAds = new LengthAwarePaginator(
            $adsPerPage->values()->all(),
            $ads->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );
        return $paginatedAds;
    }

    public function getAdsById($userId, $id)
    {
        return $this->adsRepository->getAdsById($userId, $id);
    }

    public function updateAdsKpi($userId, $id, $validated)
    {
        return $this->adsRepository->updateAdsKpi($userId, $id, $validated);
    }
}
