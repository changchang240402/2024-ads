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
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getCampaignsByUserId(Request $request)
    {
        $userId = auth()->id();
        $page = request()->get('page', 1);
        $data = [
            'name' => $request->name,
            'datetime' => $request->datetime,
            'sort' => $request->sort,
        ];
        try {
            $campaign = $this->campaignService->filterCampaign($userId, $page, $data);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 401);
        }
        
        return response()->json($campaign, 200);
    }
}
