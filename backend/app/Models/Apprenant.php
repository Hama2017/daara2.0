<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apprenant extends Model
{
    use HasFactory;
    protected $fillable = [
        'matriculeApprenant',
        'prenomApprenant',
        'nomApprenant',
        'dateNaissApprenant',
        'lieuNaissApprenant',
        'sexeApprenant',

    ];
    public function docApprenants()
    {
        return $this->belongsToMany(DocApprenant::class, 'tr_doc_apprenant', 'apprenant_id', 'doc_apprenant_id');
    }
    public function inscription()
    {
        return $this->hasMany(Inscription::class, 'apprenant_id');
    }
}
