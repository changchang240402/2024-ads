<?php

namespace App\Services;

use App\Repositories\Notification\NotificationRepository;

class NotificationService
{
    protected $notificationRepository;

    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    public function getAllNotifications($userId, $validated)
    {
        return $this->notificationRepository->getAllNotifications($userId, $validated);
    }

    public function insertNotification($notifications)
    {
        return $this->notificationRepository->insertNotification($notifications);
    }

    public function convertWarningAdsToNotify($warningBadKpiAds){
        return $this->notificationRepository->convertWarningAdsToNotify($warningBadKpiAds);
    }
}
