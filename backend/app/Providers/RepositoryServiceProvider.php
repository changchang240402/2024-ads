<?php

namespace App\Providers;

use App\Interfaces\AdsInterface;
use App\Repositories\Auth\AuthRepository;
use App\Interfaces\AuthInterface;
use App\Repositories\Admin\AdminRepository;
use App\Repositories\Admin\AdminRepositoryInterface;
use App\Repositories\Advertisement\AdvertisementRepository;
use App\Repositories\Advertisement\AdvertisementRepositoryInterface;
use App\Repositories\Notification\NotificationRepository;
use App\Repositories\Notification\NotificationRepositoryInterface;

class RepositoryServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthInterface::class, AuthRepository::class);
        $this->app->bind(AdvertisementRepositoryInterface::class, AdvertisementRepository::class);
        $this->app->bind(AdminRepositoryInterface::class, AdminRepository::class);
        $this->app->bind(NotificationRepositoryInterface::class, NotificationRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
