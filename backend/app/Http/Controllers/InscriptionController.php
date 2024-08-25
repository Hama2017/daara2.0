<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Exception;

class InscriptionController extends Controller
{
    public function index()
    {
        try {
            // Utilisation de l'eager loading pour charger les relations
            $inscriptions = Inscription::with(['apprenant', 'daara','tdNiveau'])->get();
            return response()->json($inscriptions);
        } catch (Exception $e) {
            // Gestion des exceptions pour les erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la récupération des inscriptions'], 500);
        }
    }

    public function show($id)
    {
        try {
            // Utilisation de l'eager loading pour charger les relations
            $inscriptions = Inscription::with(['apprenant', 'daara','tdNiveau'])->findOrFail($id);
            return response()->json($inscriptions);
        } catch (Exception $e) {
            // Gestion des exceptions si le Inscription n'est pas trouvé
            return response()->json(['error' => 'Inscriptions non trouvé'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'numeroInscription' => 'required|numeric|max:50',
                'mensualite' => 'required|numeric',
                'droitInscription' => 'required|numeric',
                'dateInscription' => 'required|date',
                'apprenant_id' => 'required|exists:apprenants,id',
                'daara_id' => 'required|exists:daaras,id',
                'tdNiveau_id' => 'required|exists:$tdNiveaux,id',
            ]);

            // Création d'un nouveau Inscription
            $inscriptions = Inscription::create($validated);

            return response()->json([
                'message' => 'Inscription créé avec succès',
                'Inscription' => $inscriptions,
            ], 201);
        } catch (ValidationException $e) {
            // Gestion des exceptions pour les erreurs de validation
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            // Gestion des exceptions pour les erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la création du Inscription'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Récupération du Inscription avec ses relations
            $inscriptions = Inscription::findOrFail($id);

            // Validation des données d'entrée
            $validated = $request->validate([
                'numeroInscription' => 'required|numeric|max:50',
                'mensualite' => 'required|numeric',
                'droitInscription' => 'required|numeric',
                'dateInscription' => 'required|date',
                'apprenant_id' => 'required|exists:apprenants,id',
                'daara_id' => 'required|exists:daaras,id',
                'tdNiveau_id' => 'required|exists:$tdNiveaux,id',
            ]);

            // Mise à jour du Inscription
            $inscriptions->update($validated);

            return response()->json([
                'message' => 'Inscription mis à jour avec succès',
                'Inscription' => $inscriptions,
            ]);
        } catch (ValidationException $e) {
            // Gestion des exceptions pour les erreurs de validation
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            // Gestion des exceptions pour les erreurs inattendues
            return response()->json(['error' => 'Erreur lors de la mise à jour du Inscription'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Récupération du Inscription et suppression
            $inscriptions = Inscription::findOrFail($id);
            $inscriptions->delete();

            return response()->json(['message' => 'Inscription supprimé avec succès']);
        } catch (Exception $e) {
            // Gestion des exceptions si le Inscription n'est pas trouvé ou erreur lors de la suppression
            return response()->json(['error' => 'Erreur lors de la suppression du Inscription'], 500);
        }
    }
}
