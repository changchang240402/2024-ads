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

    'DEFAULT_PHOTO_PATH' => env('DEFAULT_PHOTO_PATH', 'users/default.jpg'),
];