<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roleList = config('constants.ROLE');
        $randomNumber = random_int(0, 99);
        $createdAt = fake()->dateTimeBetween('-3 year', 'now');
        $updatedAt = fake()->dateTimeBetween($createdAt, 'now');

        if ($randomNumber < 90) {
            $role = $roleList[1]; // Vai trò 'user'
        } else {
            $role = $roleList[0]; // Vai trò 'admin'
        }

        if ($randomNumber < 30) {
            $deletedAt = fake()->dateTimeBetween($createdAt, 'now');
        } else {
            $deletedAt = null;
        }
        return [
            'name' => fake('vi_VN')->middleName() . ' ' . fake('vi_VN')->firstName(),
            'email' => fake()->unique()->safeEmail(),
            'avatar' => fake()->imageUrl(360, 360, 'animals', true),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('12345678'),
            'role' => $role,
            'remember_token' => Str::random(10),
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
            'deleted_at' => $deletedAt
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
