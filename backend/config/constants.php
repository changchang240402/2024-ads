<?php

return [

    'LIMIT_SIZE_IMAGE' => 1024,
    
    'ROLE' => [
        "admin",
        "user"
    ],

    'STATUS' => [
        "active" => 0,
        "paused" => 1,
    ],

    'STATUS_USER' => [
        "in use" => 0,
        "archived" => 1,
        "deleted"=> 2
    ],

    'BIDDING_STRATEGY' => [
        'CPC',
        'CPA'
    ],

    'HUMAN_OBJECT' => [
        'man',
        'woman'
    ],

    'WEEKDAYS' => [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ],

    'ADS_TYPES' => [
        "banner",
        "image",
        "text",
        "video",
        "native",
        "interactive"
    ],

    'PLATFORM' => [
        'Google Ads',
        'Facebook',
        'Instagram',
        'Twitter',
        'LinkedIn',
        'YouTube',
        'Pinterest'
    ],

    'DEFAULT_PHOTO_PATH' => env('DEFAULT_PHOTO_PATH', 'users/default.jpg'),

];
