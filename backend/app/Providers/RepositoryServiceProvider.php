<?php

namespace App\Providers;

use App\Interfaces\AdsInterface;
use App\Repositories\Auth\AuthRepository;
use App\Interfaces\AuthInterface;
use App\Repositories\Advertisement\AdvertisementRepository;
use App\Repositories\Advertisement\AdvertisementRepositoryInterface;

class RepositoryServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthInterface::class, AuthRepository::class);
        $this->app->bind(AdvertisementRepositoryInterface::class, AdvertisementRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
