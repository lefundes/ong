<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Category.php
class Category extends Model
{
    protected $fillable = ['name', 'color', 'icon'];
    
    public function services()
    {
        return $this->hasMany(Service::class);
    }
}