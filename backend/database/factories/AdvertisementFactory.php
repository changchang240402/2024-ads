<?php

namespace Database\Factories;

use App\Models\AdvertisementType;
use App\Models\Campaign;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Advertisement>
 */
class AdvertisementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $group = Group::all()->random();
        $campaignId = $group->value('campaign_id');
        $userId = Campaign::where('id', $campaignId)->value('user_id');
        $statusList = config('constants.STATUS');
        $status = array_rand($statusList);

        return [
            'ad_name' => fake('en_US')->text(25),
            'adgroup_id' => $group->id,
            'ad_type_id' => AdvertisementType::all()->random()->id,
            'user_id' => $userId,
            'ad_content' => fake('en_US')->text(100),
            'destination_url' => fake()->unique()->url(),
            'kpi' => fake()->randomFloat(2, 0, 99.99),
            'status' => $statusList[$status]
        ];
    }
}
