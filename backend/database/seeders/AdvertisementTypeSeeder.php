<?php

namespace Database\Seeders;

use App\Models\AdvertisementType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertisementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adsType = config('constants.ADS_TYPES');

        for ($i = 0; $i < count($adsType); $i++) {
            AdvertisementType::factory()->create([
                'ad_type_name' => $adsType[$i]
            ]);
        }
    }
}
