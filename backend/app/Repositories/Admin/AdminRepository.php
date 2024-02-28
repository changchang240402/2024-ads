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
}
