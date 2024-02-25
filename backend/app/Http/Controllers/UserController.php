<?php

namespace App\Http\Controllers;

use App\Services\StatisticService;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @var StatisticService
     */
    protected $statisticService;

    public function __construct(
        StatisticService $statisticService,
    ) {
        $this->statisticService = $statisticService;
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getStatisticByUserId()
    {
        $userId = auth()->id();

        try {
            $statistic = $this->statisticService->getStatisticByUserId($userId);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return response()->json($statistic, 200);
    }
}
