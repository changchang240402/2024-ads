<?php

namespace App\Providers;

use App\Repositories\Auth\AuthRepository;
use App\Interfaces\AuthInterface;

class RepositoryServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthInterface::class, AuthRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
