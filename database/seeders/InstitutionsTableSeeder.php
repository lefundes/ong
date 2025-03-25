<?php

namespace Database\Seeders;

use App\Models\Institution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitutionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Institution::create([
            'name' => 'Hospital Geral do Estado',
            'description' => 'Principal hospital público de Salvador',
            'address' => 'Ladeira do Hospital Geral, s/n - Nazaré',
            'phone' => '(71) 3117-7000',
            'latitude' => -12.9784,
            'longitude' => -38.5159
        ]);
        
        Institution::create([
            'name' => 'Escola Polivalente de Salvador',
            'description' => 'Escola pública de referência',
            'address' => 'Av. San Martin, 360 - Pituba',
            'phone' => '(71) 3116-6600',
            'latitude' => -12.9908,
            'longitude' => -38.4619
        ]);
        
        // Adicione mais instituições de Salvador...
    }
}
