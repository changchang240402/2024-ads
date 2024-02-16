<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasFactory;
  
    protected $table = 'groups';

    protected $fillable = [
        'adgroup_name',
        'campaign_id',
        'bidding_strategy',
        'target_keywords',
        'ad_schedule',
        'status'
    ];

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class, 'campaign_id', 'id');
    }

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class, 'adgroup_id', 'id');
    }
}
