<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trDisciplineEnseignant extends Model
{
    protected $guarded=[];
    use HasFactory;
    public function enseignants()
    {
        return $this->belongsTo(User::class,'idUser');
    }
    public function discipline()
    {
        return $this->belongsTo(Discipline::class,'idDiscipline');
    }
}
