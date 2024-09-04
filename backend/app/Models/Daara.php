<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Daara extends Model
{
    use HasFactory;


    protected $fillable = [
        'nomDaara', 
        'adresseDaara', 
        'coordonneesDaara', 
        'telephoneDaara', 
        'emailDaara', 
        'dateCreationDaara', 
        'descriptionDaara', 
        'department_id', 
        'responsable_id'
    ];

   // Relationship with Departement
   public function departement()
   {
       return $this->belongsTo(Departement::class, 'department_id');
   }

   // Relationship with User (Responsable)
   public function responsable()
   {
       return $this->belongsTo(User::class, 'responsable_id');
   }

   // Many-to-Many relationship with DocDaara
   public function docs()
   {
       return $this->belongsToMany(DocDaara::class, 'tr_doc_daaras', 'daara_id', 'doc_daara_id');
   }
   // App/Models/Daara.php

public function ief()
{
    return $this->belongsTo(IEF::class);
}

}
