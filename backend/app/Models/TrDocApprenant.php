<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrDocApprenant extends Model
{
    use HasFactory;
    public function apprenant()
    {
        return $this->belongsTo(Apprenant::class);
    }

    public function doc_apprenant()
    {
        return $this->belongsTo(DocDaara::class);
    }
}
