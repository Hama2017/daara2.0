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
        Schema::create('tr_doc_apprenants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apprenant_id')->constrained('apprenants')->onDelete('cascade');  // Relation avec la table daaras
            $table->foreignId('doc_apprenant_id')->constrained('doc_apprenants')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_doc_apprenants');
    }
};
