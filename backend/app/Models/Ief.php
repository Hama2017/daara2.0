<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ief extends Model
{
    use HasFactory;
    protected $guarded=[];
    public function ia()
    {
        return $this->belongsTo(Ia::class, 'id');
    }
}
