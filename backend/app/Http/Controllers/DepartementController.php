<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    public function index()
    {
        try {
            // Eager loading de la relation 'region'
            $departements = Departement::with('region')->get();
            return response()->json($departements);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des départements'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'nomDepartement' => 'required|string|max:255',
                'region_id' => 'required|exists:regions,id',
            ]);
    
            // Création d'un nouveau département
            $departement = Departement::create([
                'nomDepartement' => $validated['nomDepartement'],
                'region_id' => $validated['region_id'],
            ]);
    
            return response()->json([
                'message' => 'Département créé avec succès',
                'departement' => $departement,
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
            
        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du département',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            // Eager loading de la relation 'region'
            $departement = Departement::with('region')->findOrFail($id);
            return response()->json($departement);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Département non trouvé'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'nomDepartement' => 'required|string|max:255',
                'region_id' => 'required|exists:regions,id',
            ]);
    
            // Récupération du département et mise à jour
            $departement = Departement::findOrFail($id);
            $departement->update($validated);
    
            return response()->json([
                'message' => 'Département mis à jour avec succès',
                'departement' => $departement,
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
            
        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du département',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Récupération du département et suppression
            $departement = Departement::findOrFail($id);
            $departement->delete();
    
            return response()->json(['message' => 'Département supprimé avec succès']);
            
        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la suppression du département'], 500);
        }
    }
}
