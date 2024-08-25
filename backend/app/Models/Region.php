<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;


    protected $fillable = ['nomRegion', 'codeRegion'];

      // One-to-Many relationship with Departement
      public function departements()
      {
          return $this->hasMany(Departement::class, 'region_id');
      }
} 
