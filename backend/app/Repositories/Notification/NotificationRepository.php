<?php

namespace App\Repositories\Notification;

use App\Models\AdvertisementDetail;
use App\Models\Notification;
use Exception;

class NotificationRepository implements NotificationRepositoryInterface
{
    protected $notification;

    public function __construct(Notification $notification)
    {
        $this->notification = $notification;
    }

    public function getAllNotifications($userId, $validated)
    {
        try {
            $page = $validated['page'] ?? 1;
            $per_page = $validated['per_page'] ?? config('constants.NOTI_PER_PAGE');

            $notifications = $this->notification->with('advertisementDetail:id,ad_id')
                ->paginate($per_page, ['*'], 'page', $page);

            $pagination = [
                'total' => $notifications->total(),
                'per_page' => $notifications->perPage(),
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
            ];

            return [
                'notifications' => $notifications->items(),
                'pagination' => $pagination,
            ];
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function insertNotification($notifications)
    {
        try {
            foreach ($notifications as $notification) {
                $this->notification->create([
                    'title' => $notification['title'],
                    'content' => $notification['content'],
                    'ad_detail_id' => $notification['ad_detail_id'],
                ]);
            }
        } catch (\Throwable $th) {
            throw new Exception($th->getMessage(), 500);
        }
    }

    public function convertWarningAdsToNotify($warningBadKpiAds)
    {
        $notifications = [];
        foreach ($warningBadKpiAds as $ad) {
            $title = 'Warning for ads detail ID' . ' ' . $ad->id;
            $content = 'Your ad ' . $ad->ad_name . ' has bad conversion rate';

            $notification = [
                'ad_detail_id' => $ad->id,
                'title' => $title,
                'content' => $content,
            ];

            array_push($notifications, $notification);
        }

        return $notifications;
    }
}
