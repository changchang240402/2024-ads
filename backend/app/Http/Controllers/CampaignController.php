<?php

namespace App\Http\Controllers;

use App\Http\Requests\Campaign\FilterCampaignRequest;
use App\Http\Requests\Campaign\CampaignRequest;
use App\Models\Campaign;
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
     * @param FilterCampaignRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getCampaignsByUserId(FilterCampaignRequest $request)
    {
        $userId = auth()->id();
        $page = request()->get('page', 1);
        $validated = $request->validated();
        try {
            $campaign = $this->campaignService->filterCampaign($userId, $page, $validated);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return response()->json($campaign, 200);
    }

    public function showCampaignsById($id)
    {
        $userId = auth()->id();
        $page = request()->get('page', 1);
        try {
            $campaign = $this->campaignService->getCampaignsById($userId, $id, $page);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return response()->json($campaign, 200);
    }

    /**
     * @param CampaignRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createCampaign(CampaignRequest $request)
    {
        $validated = $request->validated();
        $targetAudience = $validated['human'] . ' aged ' . $validated['start_age'] . '-' . $validated['end_age'] . ' ' . $validated['activities'] . ' activities.';
        try {
            $validated['target_audience'] = $targetAudience;
            $create = $this->campaignService->createCampaign($validated);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Create successfully!',
            'data' => $create
        ], 200);
    }

    /**
     * @param CampaignRequest $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateCampaign($id, CampaignRequest $request)
    {
        $validated = $request->validated();
        $targetAudience = $validated['human'] . ' aged ' . $validated['start_age'] . '-' . $validated['end_age'] . ' ' . $validated['activities'] . ' activities.';
        try {
            $validated['target_audience'] = $targetAudience;
            $update = $this->campaignService->updateCampaign($id, $validated);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Update successfully!',
            'data' => $update
        ], 200);
    }
}
