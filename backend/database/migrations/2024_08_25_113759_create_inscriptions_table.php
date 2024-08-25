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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('numeroInscription');
            $table->float('mensualite');
            $table->float('droitInscription');
            $table->date('dateInscription');
            $table->foreignId('apprenant_id')->constrained('apprenants')->onDelete('cascade');
            $table->foreignId('daara_id')->constrained('daaras')->onDelete('cascade');
            $table->foreignId('tdNiveau_id')->constrained('td_niveaux')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
