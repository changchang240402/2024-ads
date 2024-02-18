<?php

namespace App\Repositories\Auth;

use App\Http\Requests\LoginRequest;
use App\Interfaces\AuthInterface;
use App\Models\User;
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
}
