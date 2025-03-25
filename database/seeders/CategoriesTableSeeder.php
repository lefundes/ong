<?php

namespace Database\Seeders;

use App\Models\Category; // Adicione esta linha
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        Category::create([
            'name' => 'Saúde',
            'color' => '#dc3545',
            'icon' => 'fa-hospital'
        ]);
        
        Category::create([
            'name' => 'Educação',
            'color' => '#28a745',
            'icon' => 'fa-school'
        ]);
        
        Category::create([
            'name' => 'Assistência Social',
            'color' => '#ffc107',
            'icon' => 'fa-hands-helping'
        ]);
    }
}