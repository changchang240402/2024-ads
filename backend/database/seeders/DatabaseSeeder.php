<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PlatformSeeder::class,
            AdvertisementTypeSeeder::class,
            CampaignSeeder::class,
            GroupSeeder::class,
            AdvertisementSeeder::class,
            AdvertisementDetailSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
