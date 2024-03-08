<?php

namespace App\Console\Commands;

use Exception;
use App\Models\Campaign;
use App\Models\Group;
use App\Models\Advertisement;
use Illuminate\Console\Command;
use Carbon\Carbon;

class UpdateStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'status:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update group and ads';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $time = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d');
        $campaignIds = Campaign::where('end_date', '<=', $time)->pluck('id');
        if ($campaignIds->isEmpty()) {
            return;
        }

        Group::whereIn('campaign_id', $campaignIds)->update(['status' => config('constants.STATUS.paused')]);

        $groupIds = Group::whereIn('campaign_id', $campaignIds)->pluck('id');

        if (!$groupIds->isEmpty()) {
            Advertisement::whereIn('adgroup_id', $groupIds)->update(['status' => config('constants.STATUS.paused')]);
        }
    }
}
