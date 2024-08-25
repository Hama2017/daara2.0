<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TdNiveau extends Model
{
    use HasFactory;
    protected $fillable = [
        'nomNiveau',
        'mensualiteNiveau',
        'droitInscription',
        'dureeNiveau',

    ];

    public function inscription()
    {
        return $this->hasMany(Inscription::class, 'tdNiveau_id');
    }
}
