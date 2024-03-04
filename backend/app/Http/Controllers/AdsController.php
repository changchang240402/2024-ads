<?php

namespace App\Http\Controllers;

use App\Http\Requests\Advertisement\GetAdsWithPaginationRequest;
use App\Http\Requests\PaginationRequest;
use App\Services\AdvertisementService;
use Exception;
use Illuminate\Http\Request;

class AdsController extends Controller
{
    protected $adsService;

    public function __construct(AdvertisementService $adsService)
    {
        $this->adsService = $adsService;
    }

    public function getAllAds(GetAdsWithPaginationRequest $request)
    {
        try {
            $validated = $request->validated();
            $userId = auth()->user()->id;
            $ads = $this->adsService->getAllAds($userId, $validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Get all ads successfully',
                'ads' => $ads,
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Get all ads failed',
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    public function getTopAdsByUsers(Request $request)
    {
        $userId = auth()->user()->id;
        $limit = $request->input('limit', 3);

        $ads = $this->adsService->getTopAdsByUsers($userId, $limit);
        $adsByPlatforms = $this->adsService->getTotalAdsByPlatform($userId);
        return response()->json([
            'success' => true,
            'message' => 'Get top ads by user successfully',
            'ads' => $ads,
            'totalAdsByPlatforms' => $adsByPlatforms,
        ], 200);
    }
}
