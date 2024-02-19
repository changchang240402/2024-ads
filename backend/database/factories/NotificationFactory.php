<?php

namespace Database\Factories;

use App\Models\Advertisement;
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
        $ads = Advertisement::all()->random();
        $date = fake()->dateTimeBetween('-3 year', 'now');
        $time = $date->format('F Y');
        return [
            'ad_id' => $ads->id,
            'title' => 'Warning for ads system " ' . $ads->ad_name . ' " in ' . $time . '.',
            'content' => fake('en_US')->text(100),
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
