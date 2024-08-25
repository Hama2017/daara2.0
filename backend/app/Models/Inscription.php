<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;
    protected $fillable = [
        'numeroInscription',
        'mensualite',
        'droitInscription',
        'dateInscription',
    ];

    public function tdNiveau()
    {
        return $this->belongsTo(TdNiveau::class, 'tdNiveau_id');
    }
    public function daara()
    {
        return $this->belongsTo(Daara::class, 'daara_id');
    }
    public function apprenant()
    {
        return $this->belongsTo(Apprenant::class, 'apprenant_id');
    }

}
