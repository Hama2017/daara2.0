<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrDocDaara extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = ['daara_id', 'doc_daara_id'];

    public function daara()
    {
        return $this->belongsTo(Daara::class);
    }

    public function doc_daara()
    {
        return $this->belongsTo(DocDaara::class);
    }

}
