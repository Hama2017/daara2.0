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
        Schema::table('daaras', function (Blueprint $table) {
            if (!Schema::hasColumn('daaras', 'ief_id')) {
                $table->foreignId('ief_id')->constrained('iefs')->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('daaras', function (Blueprint $table) {
            if (Schema::hasColumn('daaras', 'ief_id')) {
                $table->dropForeign(['ief_id']);
                $table->dropColumn('ief_id');
            }
        });
    }
};
