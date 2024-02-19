<?php

return [
    'ROLE' => [
        "admin",
        "user"
    ],

    'STATUS' => [
        "active" => "Active",
        "paused" => "Paused",
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
