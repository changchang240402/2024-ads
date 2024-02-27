<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaginationRequest;
use App\Services\AdvertisementService;
use Illuminate\Http\Request;

class AdsController extends Controller
{
    protected $adsService;

    public function __construct(AdvertisementService $adsService)
    {
        $this->adsService = $adsService;
    }

    public function getAllAds(PaginationRequest $request)
    {
        $validated = $request->validated();
        $page = $validated['page'] ?? 1;
        $per_page = $validated['per_page'] ?? 7;

        $userId = auth()->user()->id;
        $ads = $this->adsService->getAllAds($userId, $page, $per_page);
        return response()->json([
            'success' => true,
            'message' => 'Get all ads successfully',
            'ads' => $ads,
        ], 200);
    }

    public function getTopAdsByUsers(Request $request)
    {
        $userId = auth()->user()->id;
        $limit = $request->input('limit' , 3);

        $ads = $this->adsService->getTopAdsByUsers($userId, $limit);

        return response()->json([
            'success' => true,
            'message' => 'Get top ads by user successfully',
            'ads' => $ads,
        ], 200);
    }
}
