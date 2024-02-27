<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post("login", [AuthController::class, "login"])->name('login');
});

Route::group([
    'middleware' => ['auth', 'auth.user'],
    'prefix' => 'admin'
], function () {
    // route admin
});

Route::group([
    'middleware' => ['auth', 'auth.user'],
], function () {
    Route::group([
        'prefix' => 'campaigns'
    ], function () {
        Route::get("", [CampaignController::class, "getCampaignsByUserId"]);
        Route::get("fefw", [CampaignController::class, "showCampaignsById"]);
        Route::post("", [CampaignController::class, "createCampaign"]);
    });
    Route::group([
        'prefix' => 'groups'
    ], function () {
        Route::get("", [GroupController::class, "getGroupsByUserId"]);
    });
    Route::group([
        'prefix' => 'statistics'
    ], function () {
        Route::get("", [UserController::class, "getStatisticByUserId"]);
    });
});
