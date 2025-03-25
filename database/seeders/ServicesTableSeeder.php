<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Service::create([
            'category_id' => 1, // ID da categoria Saúde
            'institution_id' => 1, // ID do Hospital Municipal
            'name' => 'Pronto Atendimento 24h',
            'description' => 'Atendimento emergencial 24 horas',
            'schedule' => '24 horas por dia, 7 dias por semana'
        ]);
    }
}
