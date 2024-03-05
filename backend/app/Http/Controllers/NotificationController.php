<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaginationRequest;
use App\Services\AdvertisementService;
use App\Services\NotificationService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    protected $notificationService;
    protected $adsService;

    public function __construct(
        NotificationService $notificationService,
        AdvertisementService $adsService
    ) {
        $this->notificationService = $notificationService;
        $this->adsService = $adsService;
    }

    public function getAllNotifications(PaginationRequest $request)
    {
        try {
            $validated = $request->validated();
            $userId = auth()->user()->id;
            $paginationNotiList = $this->notificationService->getAllNotifications($userId, $validated);

            return response()->json([
                'success' => true,
                'message' => 'Get all notifications successfully',
                'notifications' => $paginationNotiList['notifications'],
                'pagination' => $paginationNotiList['pagination'],
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Get all notifications failed',
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    public function handleInsertNotification()
    {
        try {
            $userId = auth()->user()->id;

            $warningBadKpiAds = $this->adsService->getWarningBadKpiAdsNotifications($userId);

            $notifications = $this->notificationService->convertWarningAdsToNotify($warningBadKpiAds);

            $this->notificationService->insertNotification($notifications);

            return response()->json([
                'success' => true,
                'message' => 'Insert notification successfully',
                'notifications' => $notifications,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Create notification failed',
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }
}
