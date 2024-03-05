<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SendMessageToSlackController;
use App\Http\Controllers\TestNoti;
use App\Notifications\SendSlackNotification;
use Illuminate\Support\Facades\Notification;

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
    'middleware' => ['checkLogin'],
    'prefix' => 'auth'
], function () {
    Route::post("logout", [AuthController::class, "logout"])->name('logout');
    Route::get("me", [AuthController::class, "getUserProfile"]);
});

Route::group([
    'middleware' => ['auth.admin'],
    'prefix' => 'admin'
], function () {
    Route::put("users/{id}", [AdminController::class, "updateUserStatus"]);
    Route::get("users", [AdminController::class, "getAllUser"]);
});

Route::group([
    'middleware' => ['auth.user'],
], function () {
    Route::group([
        'prefix' => 'campaigns'
    ], function () {
        Route::get("", [CampaignController::class, "getCampaignsByUserId"]);
        Route::get("/{id}", [CampaignController::class, "showCampaignsById"]);
        Route::post("", [CampaignController::class, "createCampaign"]);
        Route::put("/{id}", [CampaignController::class, "updateCampaign"]);
    });
    Route::group([
        'prefix' => 'groups'
    ], function () {
        Route::get("", [GroupController::class, "getGroupsByUserId"]);
        Route::get("/{id}", [GroupController::class, "showGroupById"]);
    });
    Route::group([
        'prefix' => 'statistics'
    ], function () {
        Route::get("", [UserController::class, "getStatisticByUserId"]);
    });

    Route::group([
        'prefix' => 'ads'
    ], function () {
        Route::get("", [AdsController::class, "getAllAds"]);
        Route::get("top", [AdsController::class, "getTopAdsByUsers"]);
    });

    Route::group([
        'prefix' => 'noti'
    ], function () {
        Route::get("", [NotificationController::class, "getAllNotifications"]);
        Route::post("", [NotificationController::class, "handleInsertNotification"]);
    });
});

Route::group(['prefix' => 'test'], function () {
    Route::get("", [SendMessageToSlackController::class, "sendMultipleMessage"]);
});
