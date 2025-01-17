<?php

namespace App\Repositories\Admin;

use App\Models\User;
use App\Repositories\Admin\AdminRepositoryInterface;
use Exception;

class AdminRepository implements AdminRepositoryInterface
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function UpdateUserStatus($id, $status)
    {
        try {
            $user = $this->user->find($id);
            if ($user) {
                $user->status = $status;
                $user->save();
            }

            return $user;
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), 500);
        }
    }

    public function getAllUser($per_page, $page)
    {
        try {
            $users = $this->user->where('role', 'user')->paginate($per_page, ['*'], 'page', $page);

            $total_pages = ceil($users->total() / $per_page);

            $pagination = [
                'total_result' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'total_pages' => $total_pages
            ];

            return [
                'users' => $users->items(),
                'pagination' => $pagination
            ];
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), 500);
        }
    }

    public function getTotalUser()
    {
        try {
            $total = [];
            $total['all'] = $this->user->where('role', 'user')->count();
            $total['active'] = $this->user->where('role', 'user')->where('status', 0)->count();
            $total['inactive'] = $this->user->where('role', 'user')->where('status', 1)->count();
            return $total;
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), 500);
        }
    }
}
