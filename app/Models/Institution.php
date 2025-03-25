<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Institution.php
class Institution extends Model
{
    protected $fillable = ['name', 'description', 'address', 'phone', 'email', 'website', 'latitude', 'longitude'];
    
    public function services()
    {
        return $this->hasMany(Service::class);
    }
}