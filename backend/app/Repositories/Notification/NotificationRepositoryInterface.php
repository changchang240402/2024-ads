<?php

namespace App\Repositories\Notification;


interface NotificationRepositoryInterface
{
    public function getAllNotifications($userId, $validated);

    public function insertNotification($notification);
    
    public function convertWarningAdsToNotify($warningBadKpiAds);
}
