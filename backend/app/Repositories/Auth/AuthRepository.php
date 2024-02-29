<?php

namespace App\Repositories\Auth;

use App\Interfaces\AuthInterface;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthRepository implements AuthInterface
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findUserByEmail($email)
    {
        return $this->user->where('email', $email)->first();
    }

    public function createAccesstoken($validated)
    {
        return auth()->attempt($validated);
    }

    public function createRefreshToken($user)
    {
        $payload = [
            'userId' => $user->id,
            'email' => $user->email,
            'exp' => config('jwt.refresh_ttl')
        ];

        $refreshToken = JWTAuth::getJwtProvider()->encode($payload);
        return $refreshToken;
    }

    public function login($token, $refreshToken)
    {
        return [
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL(),
            'user' => auth()->user()
        ];
    }

    public function logout()
    {
        $user = Auth::user();

        if (!$user) {
            throw new Exception('User is not logged in', 401);
        }

        Auth::logout();
    }

    public function checkUserStatus($user)
    {
        if ($user->status == 1) {
            throw new Exception('User is inactive', 401);
        }
    }

    public function getUserProfile($userId)
    {
        return $this->user->find($userId);
    }
}
