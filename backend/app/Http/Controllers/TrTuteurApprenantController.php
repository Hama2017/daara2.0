<?php

namespace App\Http\Controllers;

use App\Models\TrTuteurApprenant;
use Illuminate\Http\Request;

class TrTuteurApprenantController extends Controller
{
    /**
     * Affiche une liste de la ressource TrTuteurapprenant.
     */
    public function index()
    {
        try {
            $trTuteurapprenants = TrTuteurApprenant::all();
            return response()->json($trTuteurapprenants);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Affiche un formulaire pour créer une nouvelle ressource TrTuteurapprenant.
     */
    public function create()
    {
        //
    }

    /**
     * Stocke la ressource TrTuteurapprenant nouvellement créée.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tuteur_id' => 'required|exists:tuteurs,id',
            'apprenant_id' => 'required|exists:apprenants,id',
        ]);

        try {
            $trTuteurapprenant = TrTuteurApprenant::create([
                'tuteur_id' => $request->tuteur_id,
                'apprenant_id' => $request->apprenant_id,
            ]);
            return response()->json($trTuteurapprenant, 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Affiche la ressource TrTuteurapprenant spécifiée.
     */
    public function show(string $tuteur_id, string $apprenant_id)
    {
        try {
            $trTuteurapprenant = TrTuteurApprenant::where('tuteur_id', $tuteur_id)
                ->where('apprenant_id', $apprenant_id)
                ->firstOrFail();
            return response()->json($trTuteurapprenant);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    /**
     * Affiche le formulaire pour éditer une ressource TrTuteurapprenant spécifiée.
     */
    public function edit(string $tuteur_id, string $apprenant_id)
    {
        //
    }

    /**
     * Met à jour la ressource spécifiée dans la base.
     */
    public function update(Request $request, string $tuteur_id, string $apprenant_id)
    {
        try {
            $request->validate([
                'tuteur_id' => 'required|exists:tuteurs,id',
                'apprenant_id' => 'required|exists:apprenants,id',
            ]);


            $trTuteurapprenant = TrTuteurApprenant::where('tuteur_id', $tuteur_id)
                ->where('apprenant_id', $apprenant_id)
                ->firstOrFail();
            $trTuteurapprenant->update([
                'tuteur_id' => $request->tuteur_id,
                'apprenant_id' => $request->apprenant_id,
            ]);

            return response()->json($trTuteurapprenant);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Supprime la ressource spécifiée de la base.
     */
    public function destroy(string $tuteur_id, string $apprenant_id)
    {
        try {
            $trTuteurapprenant = TrTuteurApprenant::where('tuteur_id', $tuteur_id)
                ->where('apprenant_id', $apprenant_id)
                ->firstOrFail();
            $trTuteurapprenant->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
