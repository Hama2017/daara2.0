<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocApprenant extends Model
{
    use HasFactory;
    protected $fillable = [
        'url',
        'type',
        'date',
    ];

    public function apprenants()
    {
        return $this->belongsToMany(Apprenant::class, 'tr_doc_apprenant', 'id_doc_apprenant', 'id_apprenant');
    }

}
