<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    protected $fillable = [
        'ad_id',
        'title',
        'content'
    ];

    public function advertisement(): BelongsTo
    {
        return $this->belongsTo(Advertisement::class, 'ad_id', 'id');
    }
}
