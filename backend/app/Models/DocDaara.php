<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocDaara extends Model
{
    use HasFactory;


    protected $fillable = ['url', 'type', 'date'];

    public function daaras()
    {
        return $this->belongsToMany(Daara::class, 'tr_Doc_Daara', 'id_doc_daara', 'id_daara');
    }
}
