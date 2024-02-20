<?php

namespace App\Http\Controllers;

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
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getGroupsByUserId()
    {
        $userId = auth()->id();
        // $page = request()->get('page', 1);
        // $data = [
        //     'name' => $request->name,
        //     'datetime' => $request->datetime,
        //     'sort' => $request->sort,
        // ];
        // try {
        //     $group = $this->groupService->getGroupByUserId($userId);
        // } catch (Exception $e) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => $e->getMessage()
        //     ], 401);
        // }

        return response()->json(2, 200);
    }
}
