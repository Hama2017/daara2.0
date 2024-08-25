<?php

namespace App\Http\Controllers;

use App\Models\TrDocDaara;
use Illuminate\Http\Request;

class TrDocDaaraController extends Controller
{
    public function index()
    {
        try {
            // Eager loading des relations 'daara' et 'doc_daara'
            $tr_doc_daaras = TrDocDaara::with('daara', 'doc_daara')->get();
            return response()->json($tr_doc_daaras);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des associations documents-daaras'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'daara_id' => 'required|exists:daaras,id',
                'doc_daara_id' => 'required|exists:doc_daaras,id',
            ]);
    
            // Création de la nouvelle association
            $tr_doc_daara = TrDocDaara::create($validated);
            return response()->json($tr_doc_daara, 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
            
        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json([
                'message' => 'Erreur lors de la création de l\'association document-daara',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            // Eager loading des relations 'daara' et 'doc_daara'
            $tr_doc_daara = TrDocDaara::with('daara', 'doc_daara')->findOrFail($id);
            return response()->json($tr_doc_daara);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Association document-daara non trouvée'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'daara_id' => 'required|exists:daaras,id',
                'doc_daara_id' => 'required|exists:doc_daaras,id',
            ]);
    
            // Récupération et mise à jour de l'association
            $tr_doc_daara = TrDocDaara::findOrFail($id);
            $tr_doc_daara->update($validated);
    
            return response()->json($tr_doc_daara);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
            
        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'association document-daara',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Récupération et suppression de l'association
            $tr_doc_daara = TrDocDaara::findOrFail($id);
            $tr_doc_daara->delete();
    
            return response()->json(['message' => 'Association document-daara supprimée avec succès']);
            
        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la suppression de l\'association document-daara'], 500);
        }
    }
}
