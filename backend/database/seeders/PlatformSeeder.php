<?php

namespace Database\Seeders;

use App\Models\Platform;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $flatform = config('constants.PLATFORM');

        for ($i = 0; $i < count($flatform); $i++) {
            Platform::factory()->create([
                'platform_name' => $flatform[$i]
            ]);
        }
    }
}
