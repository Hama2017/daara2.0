<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Region;
class RegionSeeder extends Seeder
{
    public function run()
    {
        $regions = [
            ['id' => 1, 'nomRegion' => 'Dakar', 'codeRegion' => 'DK'],
            ['id' => 2, 'nomRegion' => 'Thiès', 'codeRegion' => 'TH'],
            ['id' => 3, 'nomRegion' => 'Diourbel', 'codeRegion' => 'DB'],
            ['id' => 4, 'nomRegion' => 'Saint-Louis', 'codeRegion' => 'SL'],
            ['id' => 5, 'nomRegion' => 'Tambacounda', 'codeRegion' => 'TC'],
            ['id' => 6, 'nomRegion' => 'Kaolack', 'codeRegion' => 'KL'],
            ['id' => 7, 'nomRegion' => 'Kolda', 'codeRegion' => 'KD'],
            ['id' => 8, 'nomRegion' => 'Ziguinchor', 'codeRegion' => 'ZG'],
            ['id' => 9, 'nomRegion' => 'Louga', 'codeRegion' => 'LG'],
            ['id' => 10, 'nomRegion' => 'Fatick', 'codeRegion' => 'FK'],
            ['id' => 11, 'nomRegion' => 'Matam', 'codeRegion' => 'MT'],
            ['id' => 12, 'nomRegion' => 'Kaffrine', 'codeRegion' => 'KF'],
            ['id' => 13, 'nomRegion' => 'Kédougou', 'codeRegion' => 'KD'],
            ['id' => 14, 'nomRegion' => 'Sédhiou', 'codeRegion' => 'SD'],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}
