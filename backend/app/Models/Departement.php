<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;


    protected $fillable = ['nomDepartement', 'region_id'];

  // Relationship with Region
  public function region()
  {
      return $this->belongsTo(Region::class, 'region_id');
  }

  // One-to-Many relationship with Daara
  public function daaras()
  {
      return $this->hasMany(Daara::class, 'department_id');
  }
}
