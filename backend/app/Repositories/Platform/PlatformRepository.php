<?php

namespace App\Repositories\Platform;

use App\Models\Platform;
use App\Repositories\BaseRepository;

class PlatformRepository extends BaseRepository implements PlatformRepositoryInterface
{
    public function getModel()
    {
        return Platform::class;
    }

    /**
     * Total ads by platform
     * @param int $userId
     * @param int $currentYear
     * @param int $currentMonth
     * @return mixed
     */
    public function totalAdsByPlatform($userId, $currentYear, $currentMonth)
    {
        $count = $this->model
            ->withCount([
                'advertisementDetails as advertisement_details_count' => function ($query) use ($userId) {
                    $query->with('advertisement')
                        ->whereHas('advertisement', function ($query) use ($userId) {
                            $query->where('user_id', $userId);
                        })
                        ->groupBy('platform_id');
                }
            ])
            ->get(['id', 'platform_name', 'advertisement_details_count']);

        $count_last_month = $this->model
            ->withCount([
                'advertisementDetails as advertisement_details_count' => function ($query) use ($userId, $currentYear, $currentMonth) {
                    $query->with('advertisement')
                        ->whereHas('advertisement', function ($query) use ($userId, $currentYear, $currentMonth) {
                            $query->where('user_id', $userId)
                                ->whereYear('created_at', '<', $currentYear)
                                ->orWhere(function ($query) use ($currentYear, $currentMonth) {
                                    $query->whereYear('created_at', $currentMonth)
                                        ->whereMonth('created_at', '<', $currentMonth);
                                });
                        })
                        ->groupBy('platform_id');
                }
            ])
            ->get();
        return [
            'count' => $count,
            'count_last_month' => $count_last_month,
        ];
    }
}
