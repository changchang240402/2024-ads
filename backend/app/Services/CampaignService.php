<?php

namespace App\Services;

use App\Repositories\Campaign\CampaignRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CampaignService
{
    protected CampaignRepository $campaignRepository;

    public function __construct(CampaignRepository $campaignRepository) 
    {
        $this->campaignRepository = $campaignRepository;
    }

    /**
     * @param int $userId
     * @return mixed
    */
    public function getCampaignsByUserId(int $userId)
    {
        $campaigns = $this->campaignRepository->getCampaignsByUserId($userId);

        if (!$campaigns) {
            throw new Exception('Campaign not found');
        }

        return $campaigns;
    }


    

}
