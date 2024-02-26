<?php

namespace App\Http\Controllers;

use App\Http\Requests\Group\FilterGroupRequest;
use App\Services\GroupService;
use Exception;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * @var GroupService
     */
    protected $groupService;

    public function __construct(
        GroupService $groupService,
    ) {
        $this->groupService = $groupService;
    }

    /**
     * @param FilterGroupRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getGroupsByUserId(FilterGroupRequest $request)
    {
        $userId = auth()->id();
        $page = request()->get('page', 1);
        $validated = $request->validated();

        try {
            $group = $this->groupService->filterGroup($userId, $page, $validated);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }

        return response()->json($group, 200);
    }
}
