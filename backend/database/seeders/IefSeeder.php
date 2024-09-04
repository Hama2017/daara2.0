<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IEFSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $iaDakarId = DB::table('ias')->where('nom', 'IA Dakar')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Almadies', 'ia_id' => $iaDakarId],
            ['nom' => 'IEF Dakar Plateau', 'ia_id' => $iaDakarId],
            ['nom' => 'IEF Grand Dakar', 'ia_id' => $iaDakarId],
            ['nom' => 'IEF Parcelles Assainies', 'ia_id' => $iaDakarId],
        ]);

        $iaDiourbelId = DB::table('ias')->where('nom', 'IA Diourbel')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Bambey', 'ia_id' => $iaDiourbelId],
            ['nom' => 'IEF Diourbel', 'ia_id' => $iaDiourbelId],
            ['nom' => 'IEF Mbacké', 'ia_id' => $iaDiourbelId],
        ]);

        $iaFatickId = DB::table('ias')->where('nom', 'IA Fatick')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Diofior', 'ia_id' => $iaFatickId],
            ['nom' => 'IEF Fatick', 'ia_id' => $iaFatickId],
            ['nom' => 'IEF Foundiougne', 'ia_id' => $iaFatickId],
            ['nom' => 'IEF Gossas', 'ia_id' => $iaFatickId],
        ]);

        $iaKaffrineId = DB::table('ias')->where('nom', 'IA Kaffrine')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Birkelane', 'ia_id' => $iaKaffrineId],
            ['nom' => 'IEF Kaffrine', 'ia_id' => $iaKaffrineId],
            ['nom' => 'IEF Koungheul', 'ia_id' => $iaKaffrineId],
            ['nom' => 'IEF Malem Hoddar', 'ia_id' => $iaKaffrineId],
        ]);

        $iaKaolackId = DB::table('ias')->where('nom', 'IA Kaolack')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Guinguinéo', 'ia_id' => $iaKaolackId],
            ['nom' => 'IEF Kaolack Commune', 'ia_id' => $iaKaolackId],
            ['nom' => 'IEF Kaolack-Département', 'ia_id' => $iaKaolackId],
            ['nom' => 'IEF Nioro', 'ia_id' => $iaKaolackId],
        ]);

        $iaKedougouId = DB::table('ias')->where('nom', 'IA Kedougou')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Kedougou', 'ia_id' => $iaKedougouId],
            ['nom' => 'IEF Salemata', 'ia_id' => $iaKedougouId],
            ['nom' => 'IEF Saraya', 'ia_id' => $iaKedougouId],
        ]);

        $iaKoldaId = DB::table('ias')->where('nom', 'IA Kolda')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Kolda', 'ia_id' => $iaKoldaId],
            ['nom' => 'IEF Medina Yoro Foula', 'ia_id' => $iaKoldaId],
            ['nom' => 'IEF Velingara', 'ia_id' => $iaKoldaId],
        ]);

        $iaLougaId = DB::table('ias')->where('nom', 'IA Louga')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Kébémer', 'ia_id' => $iaLougaId],
            ['nom' => 'IEF Linguere', 'ia_id' => $iaLougaId],
            ['nom' => 'IEF Louga', 'ia_id' => $iaLougaId],
        ]);

        $iaMatamId = DB::table('ias')->where('nom', 'IA Matam')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Kanel', 'ia_id' => $iaMatamId],
            ['nom' => 'IEF Matam', 'ia_id' => $iaMatamId],
            ['nom' => 'IEF Raneroun', 'ia_id' => $iaMatamId],
        ]);

        $iaPikineGuediawayeId = DB::table('ias')->where('nom', 'IA Pikine-Guediawaye')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Guédiawaye', 'ia_id' => $iaPikineGuediawayeId],
            ['nom' => 'IEF Keur Massar', 'ia_id' => $iaPikineGuediawayeId],
            ['nom' => 'IEF Pikine', 'ia_id' => $iaPikineGuediawayeId],
            ['nom' => 'IEF Thiaroye', 'ia_id' => $iaPikineGuediawayeId],
        ]);

        $iaRufisqueId = DB::table('ias')->where('nom', 'IA Rufisque')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Diamniadio', 'ia_id' => $iaRufisqueId],
            ['nom' => 'IEF Rufisque Commune', 'ia_id' => $iaRufisqueId],
            ['nom' => 'IEF Sangalkam', 'ia_id' => $iaRufisqueId],
        ]);

        $iaSedhiouId = DB::table('ias')->where('nom', 'IA Sedhiou')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Bounkiling', 'ia_id' => $iaSedhiouId],
            ['nom' => 'IEF Goudomp', 'ia_id' => $iaSedhiouId],
            ['nom' => 'IEF Sedhiou', 'ia_id' => $iaSedhiouId],
        ]);

        $iaStLouisId = DB::table('ias')->where('nom', 'IA St Louis')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Dagana', 'ia_id' => $iaStLouisId],
            ['nom' => 'IEF Pété', 'ia_id' => $iaStLouisId],
            ['nom' => 'IEF Podor', 'ia_id' => $iaStLouisId],
            ['nom' => 'IEF St Louis Commune', 'ia_id' => $iaStLouisId],
            ['nom' => 'IEF St Louis Département', 'ia_id' => $iaStLouisId],
        ]);

        $iaTambaId = DB::table('ias')->where('nom', 'IA Tamba')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Bakel', 'ia_id' => $iaTambaId],
            ['nom' => 'IEF Goudiry', 'ia_id' => $iaTambaId],
            ['nom' => 'IEF Koumpentoum', 'ia_id' => $iaTambaId],
            ['nom' => 'IEF Tamba', 'ia_id' => $iaTambaId],
        ]);

        $iaThiesId = DB::table('ias')->where('nom', 'IA Thies')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Mbour 1', 'ia_id' => $iaThiesId],
            ['nom' => 'IEF Mbour 2', 'ia_id' => $iaThiesId],
            ['nom' => 'IEF Thiès Commune', 'ia_id' => $iaThiesId],
            ['nom' => 'IEF Thiès Département', 'ia_id' => $iaThiesId],
            ['nom' => 'IEF Tivaouane', 'ia_id' => $iaThiesId],
        ]);

        $iaZiguinchorId = DB::table('ias')->where('nom', 'IA Ziguinchor')->first()->id;
        DB::table('iefs')->insert([
            ['nom' => 'IEF Bignona 1', 'ia_id' => $iaZiguinchorId],
            ['nom' => 'IEF Bignona 2', 'ia_id' => $iaZiguinchorId],
            ['nom' => 'IEF Oussouye', 'ia_id' => $iaZiguinchorId],
            ['nom' => 'IEF Ziguinchor', 'ia_id' => $iaZiguinchorId],
        ]);
    }
}
