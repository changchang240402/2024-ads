<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    'middleware' => 'auth.admin',
    'prefix' => 'admin'
], function () {
   // route admin
});

Route::group([
    'middleware' => ['auth', 'auth.user'],
    'prefix' => 'campaigns'
], function () {
    Route::get("", [CampaignController::class, "getCampaignsByUserId"]);
    // Route::get("end", [CampaignController::class, "getCampaign"]);
});
