<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-1 year', 'now');
        $endDate = fake()->dateTimeBetween($startDate->modify('+2 months'), '+3 months');
        $humans = config('constants.HUMAN_OBJECT');
        $human = array_rand($humans);
        $ageStart = random_int(10, 60);
        do {
            $ageEnd = random_int($ageStart, 60);
        } while ($ageStart === $ageEnd);
        $target = $humans[$human] . ' aged ' . $ageStart . '-' . $ageEnd . ' ' . fake('en_US')->text(50) . ' activities.';
        return [
            'campaign_name' => fake('en_US')->text(25),
            'user_id' => User::where('role', config('constants.ROLE')[1])->inRandomOrder()->get()->random()->id,
            'campaign_goal' => fake('en_US')->text(100),
            'budget' => fake()->numberBetween(10, 99999) * 1000,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'ad_message' => fake('en_US')->text(100),
            'target_audience' => $target,
            'distribution_strategy' => fake('en_US')->text(100),
        ];
    }
}
