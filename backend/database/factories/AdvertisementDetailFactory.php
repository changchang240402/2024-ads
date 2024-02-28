<?php

namespace Database\Factories;

use App\Models\Advertisement;
use App\Models\Platform;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdvertisementDetail>
 */
class AdvertisementDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $impressions = random_int(1000, 100000);
        $clicks = random_int(100, $impressions);
        $conversions = random_int(10, $clicks);
        $ctr = $clicks / $impressions * 100;
        $ctr = round($ctr, 2);
        $conversionRate = $conversions / $clicks * 100;
        $conversionRate = round($conversionRate, 2);
        $createdAt = fake()->dateTimeBetween('-3 year', 'now');
        return [
            'ad_id' => Advertisement::all()->random()->id,
            'platform_id' => Platform::all()->random()->id,
            'impressions' => $impressions,
            'clicks' => $clicks,
            'ctr' => $ctr,
            'cpc' => fake()->randomFloat(2, 100.00, 9999.99),
            'cpa' => fake()->randomFloat(2, 1000.00, 99999.99),
            'conversions' => $conversions,
            'conversion_rate' => $conversionRate,
            'created_at' => $createdAt,
            'updated_at' => $createdAt ,
        ];
    }
}
