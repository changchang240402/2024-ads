<?php
namespace App\Interfaces;

use App\Http\Requests\LoginRequest;

interface AuthInterface
{
    public function findUserByEmail($email);
    public function createAccesstoken($validated);
    public function createRefreshToken($user);
    public function login($token, $refreshToken);
}
