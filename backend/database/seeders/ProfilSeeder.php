<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profil;

class ProfilSeeder extends Seeder
{
    public function run()
    {
        // Profils à ajouter
        $profils = [
            ['nomProfil' => 'Responsable Daara'],
            ['nomProfil' => 'Enseignant'],
            ['nomProfil' => 'Administrateur'],
            ['nomProfil' => 'Parent'],
            ['nomProfil' => 'Elève'],
            ['nomProfil' => 'Responsable administratif'],
            ['nomProfil' => 'Coordinateur pédagogique'],
            ['nomProfil' => 'Secrétaire'],
            ['nomProfil' => 'Directeur'],
            ['nomProfil' => 'Conseiller'],
        ];

        foreach ($profils as $profil) {
            Profil::create($profil);
        }
    }
}
