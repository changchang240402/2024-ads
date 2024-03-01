<?php

namespace App\Repositories\Admin;


interface AdminRepositoryInterface
{
    public function UpdateUserStatus($id, $status);

    public function getAllUser($per_page, $page);

    public function getTotalUser();
}
