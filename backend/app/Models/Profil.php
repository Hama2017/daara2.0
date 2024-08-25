<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $guarded=[];
    use HasFactory;

    public function user()
    {
        return $this->hasMany(User::class);
    }
}
