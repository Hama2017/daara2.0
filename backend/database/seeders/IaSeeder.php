<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Ajoutez cette ligne

class IaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ias')->insert([
            ['nom' => 'IA Dakar'],
            ['nom' => 'IA Diourbel'],
            ['nom' => 'IA Fatick'],
            ['nom' => 'IA Kaffrine'],
            ['nom' => 'IA Kaolack'],
            ['nom' => 'IA Kedougou'],
            ['nom' => 'IA Kolda'],
            ['nom' => 'IA Louga'],
            ['nom' => 'IA Matam'],
            ['nom' => 'IA Pikine-Guediawaye'],
            ['nom' => 'IA Rufisque'],
            ['nom' => 'IA Sedhiou'],
            ['nom' => 'IA St Louis'],
            ['nom' => 'IA Tamba'],
            ['nom' => 'IA Thies'],
            ['nom' => 'IA Ziguinchor'],
        ]);
    }
}
