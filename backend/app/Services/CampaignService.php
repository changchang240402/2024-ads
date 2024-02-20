<?php

namespace App\Services;

use App\Repositories\Campaign\CampaignRepository;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;

class CampaignService
{
    protected CampaignRepository $campaignRepository;

    public function __construct(CampaignRepository $campaignRepository)
    {
        $this->campaignRepository = $campaignRepository;
    }

    /**
     * @param int $userId
     * @param int $page
     * @return mixed
    */
    public function getCampaignsByUserId(int $userId, int $page)
    {
        $campaigns = $this->campaignRepository->getCampaignsByUserId($userId);

        if ($campaigns->isEmpty()) {
            throw new Exception('Campaign not found');
        }
        $perPage = 15;
        $paginatedCampaigns = new LengthAwarePaginator(
            $campaigns->forPage($page, $perPage),
            $campaigns->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginatedCampaigns;
    }
}
