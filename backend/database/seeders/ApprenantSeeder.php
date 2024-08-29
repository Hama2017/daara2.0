<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Apprenant;

class ApprenantSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 100; $i++) {
            Apprenant::create([
                'matriculeApprenant' => "MAT$i",
                'prenomApprenant' => "Prénom $i",
                'nomApprenant' => "Nom $i",
                'dateNaissApprenant' => now()->subYears(10 + $i),
                'lieuNaissApprenant' => "Lieu $i",
                'sexeApprenant' => $i % 2 === 0 ? 'M' : 'F',
            ]);
        }
    }
}
