<?php

namespace Database\Factories;

use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $biddings = config('constants.BIDDING_STRATEGY');
        $bidding = array_rand($biddings);
        $hourStart = random_int(1, 12);
        $statusList = config('constants.STATUS');
        $status = array_rand($statusList);
        $createdAt = fake()->dateTimeBetween('-1 year', 'now');
        $updatedAt = fake()->dateTimeBetween($createdAt, 'now');
        $schedule = 'Monday to Sunday , ' . $hourStart . ':00 AM - 12:00 PM';
        return [
            'adgroup_name' => fake('en_US')->text(50),
            'campaign_id' => Campaign::all()->random()->id,
            'bidding_strategy' => $biddings[$bidding],
            'target_keywords' => fake()->unique()->lexify('????') . ', ' . fake()->unique()->lexify('????'),
            'ad_schedule' => $schedule,
            'status' => $statusList[$status],
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
        ];
    }
}
