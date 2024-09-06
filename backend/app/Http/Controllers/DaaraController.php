<?php

namespace App\Http\Controllers;

use App\Models\Daara;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Exception;

class DaaraController extends Controller
{
    public function index()
    {
        try {
            // Utilisation de l'eager loading pour charger les relations
            $daaras = Daara::with(['departement.region', 'responsable', 'ief'])->get();
            return response()->json($daaras);
        } catch (Exception $e) {
            // Gestion des exceptions pour les erreurs inattendues
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            // Utilisation de l'eager loading pour charger les relations
            $daara = Daara::with(['departement.region', 'responsable', 'ief'])->findOrFail($id);
            return response()->json($daara);
        } catch (Exception $e) {
            // Gestion des exceptions si le Daara n'est pas trouvé
            return response()->json(['error' => 'Daara non trouvé'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'nomDaara' => 'required|string|max:255',
                'adresseDaara' => 'required|string|max:255',
                'coordonneesDaara' => 'required|string|max:255',
                'telephoneDaara' => 'required|string|max:20',
                'emailDaara' => 'required|email|max:255',
                'dateCreationDaara' => 'required|date',
                'descriptionDaara' => 'nullable|string',
                'department_id' => 'required|exists:departements,id',
                'responsable_id' => 'required|exists:users,id',
                'ief_id' => 'nullable',
            ]);

            // Création d'un nouveau Daara
            $daara = Daara::create($validated);

            return response()->json([
                'message' => 'Daara créé avec succès',
                'daara' => $daara,
            ], 201);
        } catch (ValidationException $e) {
            // Gestion des exceptions pour les erreurs de validation
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            // Gestion des exceptions pour les erreurs inattendues
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Récupération du Daara avec ses relations
            $daara = Daara::findOrFail($id);

            // Validation des données d'entrée
            $validated = $request->validate([
                'nomDaara' => 'required|string|max:255',
                'adresseDaara' => 'required|string|max:255',
                'coordonneesDaara' => 'required|string|max:255',
                'telephoneDaara' => 'required|string|max:20',
                'emailDaara' => 'required|email|max:255',
                'dateCreationDaara' => 'required|date',
                'descriptionDaara' => 'nullable|string',
                'department_id' => 'required|exists:departements,id',
                'responsable_id' => 'required|exists:users,id',
                'ief_id' => 'nullable|exists:iefs,id',  // Ajout de la validation pour ief_id
            ]);

            // Mise à jour du Daara
            $daara->update($validated);

            return response()->json([
                'message' => 'Daara mis à jour avec succès',
                'daara' => $daara,
            ]);
        } catch (ValidationException $e) {
            // Gestion des exceptions pour les erreurs de validation
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            // Gestion des exceptions pour les erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la mise à jour du Daara'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Récupération du Daara et suppression
            $daara = Daara::findOrFail($id);
            $daara->delete();

            return response()->json(['message' => 'Daara supprimé avec succès']);
        } catch (Exception $e) {
            // Gestion des exceptions si le Daara n'est pas trouvé ou erreur lors de la suppression
            return response()->json(['error' => 'Erreur lors de la suppression du Daara'], 500);
        }
    }
}
