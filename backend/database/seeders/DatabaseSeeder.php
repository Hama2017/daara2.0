<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Apprenant;
use App\Models\Inscription;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([
            // RegionSeeder::class,
            // DepartementSeeder::class,
            // ProfilSeeder::class,
            // UserSeeder::class,
             DaaraSeeder::class,
            // TdNiveauSeeder::class,
            // ApprenantSeeder::class,
            // InscriptionSeeder::class,
        ]);
    }
}
