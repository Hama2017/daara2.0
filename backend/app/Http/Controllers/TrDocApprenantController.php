<?php

namespace App\Http\Controllers;

use App\Models\TrDocApprenant;
use Illuminate\Http\Request;

class TrDocApprenantController extends Controller
{
    public function index()
    {
        try {
            // Eager loading des relations 'apprenant' et 'doc_apprenant'
            $tr_doc_apprenants = TrDocApprenant::with('apprenant', 'doc_apprenant')->get();
            return response()->json($tr_doc_apprenants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des associations documents-apprenants'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'apprenant_id' => 'required|exists:apprenants,id',
                'doc_apprenant_id' => 'required|exists:doc_apprenants,id',
            ]);

            // Création de la nouvelle association
            $tr_doc_apprenants = TrDocApprenant::create($validated);
            return response()->json($tr_doc_apprenants, 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json([
                'message' => 'Erreur lors de la création de l\'association document-apprenant',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            // Eager loading des relations 'apprenant' et 'doc_apprenant'
            $tr_doc_apprenants = TrDocApprenant::with('apprenant', 'doc_apprenant')->findOrFail($id);
            return response()->json($tr_doc_apprenants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Association document-apprenant non trouvée'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'apprenant_id' => 'required|exists:apprenants,id',
                'doc_apprenant_id' => 'required|exists:doc_apprenants,id',
            ]);

            // Récupération et mise à jour de l'association
            $tr_doc_apprenants = TrDocApprenant::findOrFail($id);
            $tr_doc_apprenants->update($validated);

            return response()->json($tr_doc_apprenants);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'association document-apprenant',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Récupération et suppression de l'association
            $tr_doc_apprenants = TrDocApprenant::findOrFail($id);
            $tr_doc_apprenants->delete();

            return response()->json(['message' => 'Association document-apprenant supprimée avec succès']);

        } catch (\Exception $e) {
            // Gestion des erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la suppression de l\'association document-apprenant'], 500);
        }
    }
}
