<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inscription;
use App\Models\Daara;
use App\Models\Apprenant;
use App\Models\TdNiveau;

class InscriptionSeeder extends Seeder
{
    public function run()
    {
        // Obtenez les IDs des daaras dans les départements de Dakar et Guédiawaye
        $dakarDaaras = Daara::whereHas('departement', function($query) {
            $query->where('nomDepartement', 'Dakar');
        })->pluck('id')->toArray();

        $guediawayeDaaras = Daara::whereHas('departement', function($query) {
            $query->where('nomDepartement', 'Guédiawaye');
        })->pluck('id')->toArray();

        // Combinez les IDs des daaras de Dakar et Guédiawaye
        $daaras = array_merge($dakarDaaras, $guediawayeDaaras);

        $apprenants = Apprenant::pluck('id')->toArray(); // Récupère les IDs des apprenants
        $tdNiveaux = TdNiveau::pluck('id')->toArray(); // Récupère les IDs des tdNiveaux

        // Pour chaque apprenant, créez deux inscriptions dans des daaras différents
        foreach ($apprenants as $apprenantId) {
            // Sélectionner aléatoirement deux daaras différents
            $selectedDaaras = array_rand($daaras, 2);
            $daara1 = $daaras[$selectedDaaras[0]];
            $daara2 = $daaras[$selectedDaaras[1]];

            // Créez deux inscriptions pour l'apprenant dans les deux daaras sélectionnés
            Inscription::create([
                'numeroInscription' => "NUM{$apprenantId}_1",
                'mensualite' => rand(100, 500),
                'droitInscription' => rand(50, 150),
                'dateInscription' => now()->subMonths(rand(1, 12)),
                'apprenant_id' => $apprenantId,
                'daara_id' => $daara1,
                'tdNiveau_id' => $tdNiveaux[array_rand($tdNiveaux)],
            ]);

            Inscription::create([
                'numeroInscription' => "NUM{$apprenantId}_2",
                'mensualite' => rand(100, 500),
                'droitInscription' => rand(50, 150),
                'dateInscription' => now()->subMonths(rand(1, 12)),
                'apprenant_id' => $apprenantId,
                'daara_id' => $daara2,
                'tdNiveau_id' => $tdNiveaux[array_rand($tdNiveaux)],
            ]);
        }
    }
}
