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
        Schema::table('advertisements', function (Blueprint $table) {
            if (Schema::hasColumn('advertisements', 'status')){
                $table->tinyInteger('status')->default('0')->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('advertisements', function (Blueprint $table) {
            if (Schema::hasColumn('advertisements', 'status')){
                $table->string('status', 15)->default('active')->change();
            }
        });
    }
};
