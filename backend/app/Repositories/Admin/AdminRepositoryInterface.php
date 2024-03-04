<?php

namespace App\Repositories\Admin;


interface AdminRepositoryInterface
{
    public function UpdateUserStatus($id, $status);

    public function getAllUser($validated);

    public function getTotalUser();
}
