<?php

namespace Database\Factories;

use App\Models\Advertisement;
use App\Models\AdvertisementDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notificaition>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ads_details = AdvertisementDetail::all()->random();
        $fakeTimestapm = fake()->dateTimeBetween('-3 year', 'now');
        $time = $fakeTimestapm->format('F Y');

        return [
            'ad_detail_id' => $ads_details->id,
            'title' => 'Warning for ads system " ' . $ads_details->id . ' " in ' . $time . '.',
            'content' => fake('en_US')->text(100),
            'created_at' => $fakeTimestapm,
            'updated_at' => $fakeTimestapm,
        ];
    }
}
