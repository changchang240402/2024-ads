<?php

namespace Database\Seeders;

use App\Models\AdvertisementDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertisementDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdvertisementDetail::factory()->count(1000)->create();
    }
}
