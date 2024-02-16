<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdvertisementType extends Model
{
    use HasFactory;

    protected $table = 'advertisement_types';

    protected $fillable = [
        'ad_type_name'
    ];

    public function advertisements(): HasMany
    {
        return $this->hasMany(Advertisement::class, 'ad_type_id', 'id');
    }
}
