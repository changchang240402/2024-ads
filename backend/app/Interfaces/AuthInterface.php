<?php

namespace App\Interfaces;

interface AuthInterface
{
    public function findUserByEmail($email);
    public function createAccesstoken($validated);
    public function createRefreshToken($user);
    public function login($token, $refreshToken);
    public function logout();
}
