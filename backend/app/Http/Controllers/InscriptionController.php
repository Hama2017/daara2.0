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

    public function getPercentageByDepartement($departementId)
    {
        try {
            // Obtenez les inscriptions pour le département donné
            $totalInscriptions = Inscription::whereHas('daara', function ($query) use ($departementId) {
                $query->where('department_id', $departementId);
            })->count();

            if ($totalInscriptions == 0) {
                return response()->json(['error' => 'Aucune inscription trouvée pour ce département'], 404);
            }

            // Obtenez le nombre de garçons et de filles
            $garcons = Inscription::whereHas('daara', function ($query) use ($departementId) {
                $query->where('department_id', $departementId);
            })->whereHas('apprenant', function ($query) {
                $query->where('sexeApprenant', 'M');
            })->count();

            $filles = Inscription::whereHas('daara', function ($query) use ($departementId) {
                $query->where('department_id', $departementId);
            })->whereHas('apprenant', function ($query) {
                $query->where('sexeApprenant', 'F');
            })->count();

            // Ajout de log pour vérifier les résultats intermédiaires
            // Log::info("Total Inscriptions: $totalInscriptions");
            // Log::info("Garcons: $garcons");
            // Log::info("Filles: $filles");

            // Calculez les pourcentages
            $pourcentageGarcons = ($totalInscriptions > 0) ? ($garcons / $totalInscriptions) * 100 : 0;
            $pourcentageFilles = ($totalInscriptions > 0) ? ($filles / $totalInscriptions) * 100 : 0;

            // Obtenez l'âge des apprenants
            $ages = Inscription::whereHas('daara', function ($query) use ($departementId) {
                $query->where('department_id', $departementId);
            })->with('apprenant')->get()->map(function ($inscription) {
                $dateNaissance = $inscription->apprenant->dateNaissApprenant;
                if ($dateNaissance instanceof \Carbon\Carbon) {
                    return now()->year - $dateNaissance->year;
                }
                return now()->year - \Carbon\Carbon::parse($dateNaissance)->year;
            });

            // Groupement des âges par tranches
            $ageGroups = [
                'moins_de_10' => 0,
                'entre_10_et_15' => 0,
                'plus_de_15' => 0,
            ];

            foreach ($ages as $age) {
                if ($age < 10) {
                    $ageGroups['moins_de_10']++;
                } elseif ($age <= 15) {
                    $ageGroups['entre_10_et_15']++;
                } else {
                    $ageGroups['plus_de_15']++;
                }
            }

            // Calculez les pourcentages d'âge
            foreach ($ageGroups as $key => $value) {
                $ageGroups[$key] = ($totalInscriptions > 0) ? ($value / $totalInscriptions) * 100 : 0;
            }

            return response()->json([
                'garcons' => $pourcentageGarcons,
                'filles' => $pourcentageFilles,
                'ageGroups' => $ageGroups,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors du calcul des pourcentages: ' . $e->getMessage()], 500);
        }
    }


}
