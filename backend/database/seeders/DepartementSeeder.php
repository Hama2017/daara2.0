<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Departement;

class DepartementSeeder extends Seeder
{
    public function run()
    {
        $departements = [
            ['nomDepartement' => 'Dakar', 'region_id' => 1],
            ['nomDepartement' => 'Pikine', 'region_id' => 1],
            ['nomDepartement' => 'Guédiawaye', 'region_id' => 1],
            ['nomDepartement' => 'Rufisque', 'region_id' => 1],

            ['nomDepartement' => 'Thiès', 'region_id' => 2],
            ['nomDepartement' => 'Mbour', 'region_id' => 2],
            ['nomDepartement' => 'Tivaouane', 'region_id' => 2],

            ['nomDepartement' => 'Diourbel', 'region_id' => 3],
            ['nomDepartement' => 'Bambey', 'region_id' => 3],
            ['nomDepartement' => 'Mbacké', 'region_id' => 3],

            ['nomDepartement' => 'Saint-Louis', 'region_id' => 4],
            ['nomDepartement' => 'Dagana', 'region_id' => 4],
            ['nomDepartement' => 'Podor', 'region_id' => 4],

            ['nomDepartement' => 'Tambacounda', 'region_id' => 5],
            ['nomDepartement' => 'Bakel', 'region_id' => 5],
            ['nomDepartement' => 'Goudiry', 'region_id' => 5],
            ['nomDepartement' => 'Koumpentoum', 'region_id' => 5],

            ['nomDepartement' => 'Kaolack', 'region_id' => 6],
            ['nomDepartement' => 'Guinguinéo', 'region_id' => 6],
            ['nomDepartement' => 'Nioro du Rip', 'region_id' => 6],

            ['nomDepartement' => 'Kolda', 'region_id' => 7],
            ['nomDepartement' => 'Médina Yoro Foulah', 'region_id' => 7],
            ['nomDepartement' => 'Vélingara', 'region_id' => 7],

            ['nomDepartement' => 'Ziguinchor', 'region_id' => 8],
            ['nomDepartement' => 'Bignona', 'region_id' => 8],
            ['nomDepartement' => 'Oussouye', 'region_id' => 8],

            ['nomDepartement' => 'Louga', 'region_id' => 9],
            ['nomDepartement' => 'Kébémer', 'region_id' => 9],
            ['nomDepartement' => 'Linguère', 'region_id' => 9],

            ['nomDepartement' => 'Fatick', 'region_id' => 10],
            ['nomDepartement' => 'Foundiougne', 'region_id' => 10],
            ['nomDepartement' => 'Gossas', 'region_id' => 10],

            ['nomDepartement' => 'Matam', 'region_id' => 11],
            ['nomDepartement' => 'Kanel', 'region_id' => 11],
            ['nomDepartement' => 'Ranérou Ferlo', 'region_id' => 11],

            ['nomDepartement' => 'Kaffrine', 'region_id' => 12],
            ['nomDepartement' => 'Koungheul', 'region_id' => 12],
            ['nomDepartement' => 'Malem Hodar', 'region_id' => 12],
            ['nomDepartement' => 'Birkilane', 'region_id' => 12],

            ['nomDepartement' => 'Kédougou', 'region_id' => 13],
            ['nomDepartement' => 'Salémata', 'region_id' => 13],
            ['nomDepartement' => 'Saraya', 'region_id' => 13],

            ['nomDepartement' => 'Sédhiou', 'region_id' => 14],
            ['nomDepartement' => 'Bounkiling', 'region_id' => 14],
            ['nomDepartement' => 'Goudomp', 'region_id' => 14],
        ];

        foreach ($departements as $departement) {
            Departement::create($departement);
        }
    }
}
