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
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->string('ad_name');
            $table->unsignedBigInteger('adgroup_id');
            $table->unsignedBigInteger('ad_type_id');
            $table->string('ad_content');
            $table->string('destination_url');
            $table->decimal('kpi', 5, 2);
            $table->string('status', 15)->default('active');
            $table->foreign('adgroup_id')->references('id')->on('groups');
            $table->foreign('ad_type_id')->references('id')->on('advertisement_types');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advertisements');
    }
};
