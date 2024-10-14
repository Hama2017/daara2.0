<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profil;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Récupère l'ID du profil "Responsable Daara"
        $responsableProfilId = Profil::where('nomProfil', 'Responsable Daara')->first()->id;

        // Crée 5 utilisateurs avec le profil "Responsable Daara"
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'nomUser' => "Responsable Daara",
                'prenomUser' => $i, // Utilise le numéro pour distinguer les utilisateurs
                'emailUser' => "bassinediallo20$i@gmail.com",
                'mdpUser' => Hash::make('passer'), // Remplacez 'password' par le mot de passe désiré
                'telephoneUser' => "Téléphone $i",
                'idProfil' => $responsableProfilId,
            ]);
        }
    }
}
