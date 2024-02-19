<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Advertisement extends Model
{
    use HasFactory;

    protected $table = 'advertisements';

    protected $fillable = [
        'ad_name',
        'adgroup_id',
        'ad_type_id',
        'user_id',
        'ad_content',
        'destination_url',
        'kpi',
        'status'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'adgroup_id', 'id');
    }

    public function advertisementType(): BelongsTo
    {
        return $this->belongsTo(AdvertisementType::class, 'ad_type_id', 'id');
    }

    public function advertisementDetails(): HasMany
    {
        return $this->hasMany(AdvertisementDetail::class, 'ad_id', 'id');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notificaition::class, 'ad_id', 'id');
    }
}
