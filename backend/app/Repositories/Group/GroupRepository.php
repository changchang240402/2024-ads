<?php

namespace App\Repositories\Group;

use App\Models\Group;
use App\Repositories\BaseRepository;
use App\Repositories\CampaignRepository;

class GroupRepository extends BaseRepository implements GroupRepositoryInterface
{
    protected CampaignRepository $campaignRepository;

    public function __construct(CampaignRepository $campaignRepository) {
        $this->campaignRepository = $campaignRepository;
    }

    public function getModel()
    {
        return Group::class;
    }

    /**
     * @param int $userId id of user login
     * @return mixed
    */
    public function getGroupsByUserId($userId){
        return $this->model::with("campaign")
                            ->with("advertisements")
                            ->withCount("advertisements")
                            ->where("campaign.user_id", $userId)->get();
    }
}