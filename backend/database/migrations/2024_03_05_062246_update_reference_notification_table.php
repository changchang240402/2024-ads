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
        Schema::table('notifications', function (Blueprint $table) {
            if (Schema::hasColumn('notifications', 'ad_id')) {
                $table->dropForeign(['ad_id']);
                $table->dropColumn('ad_id');
            }

            if (!Schema::hasColumn('notifications', 'ad_detail_id')) {
                $table->unsignedBigInteger('ad_detail_id');
                $table->foreign('ad_detail_id')->references('id')->on('advertisement_details')->onDelete('cascade');
            }

            $table->integer('isRead')->default(0)->after('ad_detail_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            if (Schema::hasColumn('notifications', 'ad_detail_id')) {
                $table->dropForeign(['ad_detail_id']);
                $table->dropColumn('ad_detail_id');
            }

            if (!Schema::hasColumn('notifications', 'ad_id')) {
                $table->unsignedBigInteger('ad_id')->nullable()->after('ad_detail_id');
                $table->foreign('ad_id')->references('id')->on('advertisement_details')->onDelete('cascade');
            }
            if (Schema::hasColumn('notifications', 'isRead')) {
                $table->dropColumn('isRead');
            };
        });
    }
};
