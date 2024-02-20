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
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'avatar') && !Schema::hasColumn('users', 'role') && !Schema::hasColumn('users', 'deleted_at')) {
                    $table->string('avatar')->nullable();
                    $table->string('role',10)->default('user');
                    $table->softDeletes();
                }
                if (Schema::hasColumn('users', 'name')){
                    $table->string('name', 50)->change();
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'avatar') && Schema::hasColumn('users', 'role') && Schema::hasColumn('users', 'deleted_at')) {
                $table->dropColumn('avatar');
                $table->dropColumn('role');
                $table->dropSoftDeletes();
            }
            if (Schema::hasColumn('users', 'name')){
                $table->string('name')->change();
            }
        });
    }
};
