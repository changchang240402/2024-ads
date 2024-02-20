<?php

namespace App\Http\Controllers;

use App\Services\CampaignService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CampaignController extends Controller
{
    /**
     * @var CampaignService
     */
    protected $campaignService;
    
    public function __construct(
        CampaignService $campaignService,
    ) {
        $this->campaignService = $campaignService;
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getCampaignsByUserId()
    {
        $userId = auth()->id();

        try {

            $campaign = $this->campaignService->getCampaignsByUserId($userId);

        } catch (Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }

        return response()->json(
            $campaign,
            200
        );
    }

}
