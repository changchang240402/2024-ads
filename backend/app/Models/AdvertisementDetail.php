<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdvertisementDetail extends Model
{
    use HasFactory;

    protected $table = 'advertisement_details';

    protected $fillable = [
        'ad_id',
        'platform_id',
        'impressions',
        'clicks',
        'ctr',
        'cpc',
        'cpa',
        'conversions',
        'conversion_rate'
    ];

    public function advertisement(): BelongsTo
    {
        return $this->belongsTo(Advertisement::class, 'ad_id', 'id');
    }

    public function platform(): BelongsTo
    {
        return $this->belongsTo(Platform::class, 'platform_id', 'id');
    }
}
