<?php

namespace App\Services;

use App\Repositories\Admin\AdminRepository;

class AdminService
{
    protected $adminRepository;

    public function __construct(AdminRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    public function UpdateUserStatus($id, $status)
    {
        return $this->adminRepository->UpdateUserStatus($id, $status);
    }

    public function getAllUser($per_page, $page)
    {
        return $this->adminRepository->getAllUser($per_page, $page);
    }

    public function getTotalUser()
    {
        return $this->adminRepository->getTotalUser();
    }
}
