<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\LoginRequest;
use App\Repositories\Auth\AuthRepository;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = $this->authRepository->findUserByEmail($validated['email']);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Email does not exist in the system'
            ], 401);
        }

        $token = $this->authRepository->createAccesstoken($validated);
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Password incorrect'
            ], 401);
        }

        $refreshToken = $this->authRepository->createRefreshToken($user);

        $response =  $this->authRepository->login($token, $refreshToken);
        return response()->json(
            $response,
            200
        );
    }
}
