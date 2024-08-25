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
        Schema::create('tr_doc_daaras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daara_id')->constrained('daaras')->onDelete('cascade');  // Relation avec la table daaras
            $table->foreignId('doc_daara_id')->constrained('doc_daaras')->onDelete('cascade');  // Relation avec la table doc_daaras
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_doc_daaras');
    }
};
