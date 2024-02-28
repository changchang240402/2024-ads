<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserStatusRequest;
use App\Services\AdminService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    public function updateUserStatus(UpdateUserStatusRequest $request)
    {
        $validated = $request->validated();
        $id = $request->id;
        try {
            $user = $this->adminService->UpdateUserStatus($id, $validated['status']);
            return response()->json([
                'success' => true,
                'message' => 'User status updated successfully',
                'user' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], $th->getCode());
        }
    }
}
