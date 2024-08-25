<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trDisciplineEnseignant extends Model
{
    use HasFactory;
    public function enseignants()
    {
        return $this->hasMany(User::class);
    }
    public function discipline()
    {
        return $this->hasMany(Discipline::class);
    }
}
