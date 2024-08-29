<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TdNiveau;

class TdNiveauSeeder extends Seeder
{
    public function run()
    {
        $niveaux = [
            ['nomNiveau' => 'Niveau 1', 'mensualiteNiveau' => 150.00, 'droitInscription' => 50.00, 'dureeNiveau' => 12],
            ['nomNiveau' => 'Niveau 2', 'mensualiteNiveau' => 200.00, 'droitInscription' => 75.00, 'dureeNiveau' => 10],
            ['nomNiveau' => 'Niveau 3', 'mensualiteNiveau' => 250.00, 'droitInscription' => 100.00, 'dureeNiveau' => 8],
            ['nomNiveau' => 'Niveau 4', 'mensualiteNiveau' => 300.00, 'droitInscription' => 125.00, 'dureeNiveau' => 6],
            ['nomNiveau' => 'Niveau 5', 'mensualiteNiveau' => 350.00, 'droitInscription' => 150.00, 'dureeNiveau' => 12],
            ['nomNiveau' => 'Niveau 6', 'mensualiteNiveau' => 400.00, 'droitInscription' => 175.00, 'dureeNiveau' => 9],
            ['nomNiveau' => 'Niveau 7', 'mensualiteNiveau' => 450.00, 'droitInscription' => 200.00, 'dureeNiveau' => 7],
            ['nomNiveau' => 'Niveau 8', 'mensualiteNiveau' => 500.00, 'droitInscription' => 225.00, 'dureeNiveau' => 11],
            ['nomNiveau' => 'Niveau 9', 'mensualiteNiveau' => 550.00, 'droitInscription' => 250.00, 'dureeNiveau' => 10],
            ['nomNiveau' => 'Niveau 10', 'mensualiteNiveau' => 600.00, 'droitInscription' => 275.00, 'dureeNiveau' => 12],
        ];

        foreach ($niveaux as $niveau) {
            TdNiveau::create($niveau);
        }
    }
}
