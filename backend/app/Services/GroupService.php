<?php

namespace App\Services;

use App\Services\AdvertisementService;
use App\Repositories\Group\GroupRepository;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use DateTime;

class GroupService
{
    private const PAGINATE_PER_PAGE = 10;

    protected GroupRepository $groupRepository;

    protected AdvertisementService $advertisementService;

    public function __construct(
        GroupRepository $groupRepository,
        AdvertisementService $advertisementService
    ) {
        $this->groupRepository = $groupRepository;
        $this->advertisementService = $advertisementService;
    }

    /**
     * @param int $userId
     * @param int $page
     * @param string $title
     * @param string $biddingStrategy
     * @param int $status
     * @param string $sort
     * @return mixed
     */
    public function getGroupByUserId(
        int $userId,
        int $page,
        string $title = null,
        string $biddingStrategy = null,
        int $status = null,
        string $sort = null
    ) {
        $groups = $this->groupRepository->getGroupsByUserId($userId);
        if ($groups->count() > 0) {
            if ($title) {
                $groups = $this->filterByTittle($groups, $title);
            }
            if ($biddingStrategy) {
                $groups = $this->filterByBidding($groups, $biddingStrategy);
            }
            if ($status !== null) {
                $groups = $this->filterByStatus($groups, $status);
            }
            if ($sort) {
                $groups = $this->filterBySort($groups, $sort);
            }
        }
        if ($groups->isEmpty()) {
            throw new Exception('Group not found');
        }
        $perPage = self::PAGINATE_PER_PAGE;
        $groupsPerPage = $groups->forPage($page, $perPage);
        $paginatedGroups = new LengthAwarePaginator(
            $groupsPerPage->values()->all(),
            $groups->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginatedGroups;
    }

    /**
     * @param mixed $groups
     * @param string $title
     * @return mixed
     */

    private function filterByTittle($groups, $title)
    {
        $names = ['adgroup_name', 'target_keywords'];
        return $title ? $groups->filter(function ($group) use ($title, $names) {
            $searchKeyword = strtolower($title);
            foreach ($names as $name) {
                $groupTitle = strtolower($group[$name]);
                if (Str::contains($groupTitle, $searchKeyword)) {
                    return true;
                }
            }
            $campaignName = strtolower($group['campaign']['campaign_name']);
            if (Str::contains($campaignName, $searchKeyword)) {
                return true;
            }
            return false;
        }) : $groups;
    }

    /**
     * @param mixed $groups
     * @param string $biddingStrategy
     * @return mixed
     */

    private function filterByBidding($groups, $biddingStrategy)
    {
        return $biddingStrategy ? $groups = $groups->filter(function ($group) use ($biddingStrategy) {
            return $group['bidding_strategy'] === $biddingStrategy;
        }) : $groups;
    }

    /**
     * @param mixed $groups
     * @param int $status
     * @return mixed
     */

    private function filterByStatus($groups, $status)
    {
        return $status !== null ? $groups = $groups->filter(function ($group) use ($status) {
            return $group['status'] === $status;
        }) : $groups;
    }

    /**
     * @param mixed $groups
     * @param string $sort
     * @return mixed
     */
    private function filterBySort($groups, $sort)
    {
        if ($sort === 'asc') {
            return $groups->sortBy('total_advertisement');
        } elseif ($sort === 'desc') {
            return $groups->sortByDesc('total_advertisement');
        }
    }

    /**
     * @param int $userId
     * @param int $page
     * @param array $filter
     * @return mixed
     */
    public function filterGroup(int $userId, int $page, array $filter)
    {
        $title = null;
        $biddingStrategy = null;
        $status = null;
        $sort = null;
        if (isset($filter['name'])) {
            $title = $filter['name'];
        }
        if (isset($filter['biddingStrategy'])) {
            $biddingStrategy = $filter['biddingStrategy'];
        }
        if (isset($filter['status'])) {
            $status = $filter['status'];
        }
        if (isset($filter['sort'])) {
            $sort = $filter['sort'];
        }
        return $this->getGroupByUserId($userId, $page, $title, $biddingStrategy, $status, $sort);
    }

    /**
     * get detail group by id
     * @param int $userId
     * @param int $groupId
     * @param int $page
     * @return mixed
     */
    public function getGroupById($userId, $groupId, $page)
    {
        $group = $this->groupRepository->getGroupsById($userId, $groupId);
        if (!$group) {
            throw new Exception('Group not found');
        }
        $groupIdArray = [$groupId];
        $ads = $this->advertisementService->getAdsByGroupIds($userId, $groupIdArray, $page);
        return [
            'group' => $group,
            'ads' => $ads,
        ];
    }
}
