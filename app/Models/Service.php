<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Service.php
class Service extends Model
{
    protected $fillable = ['category_id', 'institution_id', 'name', 'description', 'schedule'];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
}