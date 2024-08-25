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
        Schema::create('daaras', function (Blueprint $table) {
            $table->id(); 
            $table->string('nomDaara');
            $table->string('adresseDaara');
            $table->string('coordonneesDaara');
            $table->string('telephoneDaara');
            $table->string('emailDaara');
            $table->date('dateCreationDaara');
            $table->text('descriptionDaara');
            $table->foreignId('department_id')->constrained('departements')->onDelete('cascade');  // Relation avec la table departements
            $table->foreignId('responsable_id')->constrained('users')->onDelete('cascade');  // Relation avec la table users
            $table->softDeletes();  // Pour les soft deletes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daaras');
    }
};
