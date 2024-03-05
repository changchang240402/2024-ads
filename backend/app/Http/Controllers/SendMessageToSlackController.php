<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use App\Notifications\SendSlackNotification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class SendMessageToSlackController extends Controller
{
    public function sendMultipleMessage()
    {
        try {
            $platforms = Platform::all();

            foreach ($platforms as $platform) {
                Notification::route('slack', env('SLACK_WEBHOOK_URL'))
                    ->notify(new SendSlackNotification($platform->platform_name));
            }

            return response()->json([
                'success' => true,
                'message' => 'Send message to slack successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }
}
