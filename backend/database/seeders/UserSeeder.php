<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('lyvantanh2002'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'User',
            'email' => 'lyvantanh101@gmail.com',
            'password' => bcrypt('lyvantanh2002'),
            'role' => 'user'
        ]);

        User::factory()->count(10)->create();
    }
}
