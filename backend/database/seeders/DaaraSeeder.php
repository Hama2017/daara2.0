<?php

namespace Database\Seeders;

use App\Models\Daara;
use App\Models\Region;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DaaraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $daaras=[
            [
                'nomDaara' => 'DUNYA',
                'adresseDaara' => 'Louga Khoudoss',
                'coordonneesDaara' => '15.030631,-15.046336',
                'telephoneDaara' => '775676542',
                'emailDaara' => 'dunya@daara2.0.sn',
                'dateCreationDaara' => '2014-08-06',
                'descriptionDaara' => 'Daara moderne',
                'department_id' => 9,
                'responsable_id' => 3,
            ],
            [
                'nomDaara' => 'DAARA NGOR',
                'adresseDaara' => 'Dakar Ngor',
                'coordonneesDaara' => '14.720937,-17.487602',
                'telephoneDaara' => '776543210',
                'emailDaara' => 'ngor@daara2.0.sn',
                'dateCreationDaara' => '2015-09-15',
                'descriptionDaara' => 'École traditionnelle de Ngor',
                'department_id' => 1,
                'responsable_id' => 1,
            ],
            [
                'nomDaara' => 'DAARA SAINT-LOUIS',
                'adresseDaara' => 'Saint-Louis Nord',
                'coordonneesDaara' => '16.017933,-16.489622',
                'telephoneDaara' => '774563210',
                'emailDaara' => 'saintlouis@daara2.0.sn',
                'dateCreationDaara' => '2013-07-12',
                'descriptionDaara' => 'Daara au bord du fleuve',
                'department_id' => 3,
                'responsable_id' => 3,
            ],
            [
                'nomDaara' => 'DAARA TOUBA',
                'adresseDaara' => 'Touba Darou Khoudoss',
                'coordonneesDaara' => '14.866288,-15.870720',
                'telephoneDaara' => '772345678',
                'emailDaara' => 'touba@daara2.0.sn',
                'dateCreationDaara' => '2016-04-25',
                'descriptionDaara' => 'Daara dans la ville sainte de Touba',
                'department_id' => 15,
                'responsable_id' => 4,
            ],
            [
                'nomDaara' => 'DAARA ZIGUINCHOR',
                'adresseDaara' => 'Ziguinchor Centre',
                'coordonneesDaara' => '12.573549,-16.271654',
                'telephoneDaara' => '773456789',
                'emailDaara' => 'ziguinchor@daara2.0.sn',
                'dateCreationDaara' => '2017-02-11',
                'descriptionDaara' => 'Daara de Ziguinchor',
                'department_id' => 22,
                'responsable_id' => 5,
            ],
            [
                'nomDaara' => 'DAARA KAOLACK',
                'adresseDaara' => 'Kaolack Ndiaffate',
                'coordonneesDaara' => '14.182379,-16.253369',
                'telephoneDaara' => '771234567',
                'emailDaara' => 'kaolack@daara2.0.sn',
                'dateCreationDaara' => '2018-01-20',
                'descriptionDaara' => 'École coranique de Kaolack',
                'department_id' => 11,
                'responsable_id' => 4,
            ],
        ];
        foreach ($daaras as $daara) {
            Daara::create($daara);
        }
    }
}
