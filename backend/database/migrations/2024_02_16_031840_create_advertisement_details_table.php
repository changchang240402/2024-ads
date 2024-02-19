<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('advertisement_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ad_id');
            $table->unsignedBigInteger('platform_id');
            $table->integer('impressions');
            $table->integer('clicks');
            $table->decimal('ctr', 10, 2);
            $table->decimal('cpc', 10, 2)->nullable();
            $table->decimal('cpa', 10, 2)->nullable();
            $table->decimal('conversion_rate', 10, 2)->nullable();
            $table->integer('conversions');
            $table->foreign('ad_id')->references('id')->on('advertisements');
            $table->foreign('platform_id')->references('id')->on('platforms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advertisement_details');
    }
};
