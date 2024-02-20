<?php

namespace App\Http\Controllers;

use App\Services\CampaignService;
use Exception;
use Illuminate\Http\Request;

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
     * Display a listing of the resource.
     *
     * @param string $key
     *
     * @return mixed
     */
    public function index()
    {
        $userId = (int) auth()->id();
        try {
            $campaign = $this->campaignService->getCampaignsByUserId($userId);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }

        return response()->json(
            $campaign,
            200
        );
    }
}
