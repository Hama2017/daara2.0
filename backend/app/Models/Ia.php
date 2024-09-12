<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ia extends Model
{
    use HasFactory;
    protected $guarded=[];
    public function ief()
    {
        return $this->hasMany(Ief::class, 'ia_id');
    }
}
