<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Platform extends Model
{
    use HasFactory;

    protected $table = 'platforms';

    protected $fillable = [
        'platform_name'
    ];

    public function advertisementDetails(): HasMany
    {
        return $this->hasMany(AdvertisementDetail::class, 'platform_id', 'id');
    }
}
