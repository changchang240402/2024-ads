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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('campaign_name');
            $table->unsignedBigInteger('user_id');
            $table->string('campaign_goal');
            $table->decimal('budget', 10, 2);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('ad_message');
            $table->string('target_audience');
            $table->string('distribution_strategy');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
