<?php

namespace App\Http\Controllers;

use App\Models\TdNiveau;
use Illuminate\Http\Request;

class TdNiveauController extends Controller
{
    public function index()
    {
        try {
            $tdNiveaux = TdNiveau::all();
            return response()->json($tdNiveaux);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Affiche un formulaire pour créer une nouvelle ressource TdNiveau.
     */
    public function create()
    {
        //
    }

    /**
     * Stocke la ressource TdNiveau nouvellement créée.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nomNiveau' => 'required|string|max:50',
            'mensualiteNiveau' => 'required|string|max:50',
            'droitInscription' => 'required|numeric|max:50',
            'dureeNiveau' => 'required|numeric',
        ]);

        try {
            $tdNiveaux = TdNiveau::create([
                'nomNiveau' => $request->nomNiveau,
                'mensualiteNiveau' => $request->mensualiteNiveau,
                'droitInscription' => $request->droitInscription,
                'dureeNiveau' => $request->dureeNiveau,
            ]);
            return response()->json($tdNiveaux, 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Affiche la ressource TdNiveau spécifiée.
     */
    public function show(string $id)
    {
        try {
            $tdNiveaux = TdNiveau::findOrFail($id);
            return response()->json($tdNiveaux);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    /**
     * Affiche le formulaire pour éditer une ressource TdNiveau spécifiée.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Met à jour la ressource spécifiée dans la base.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nomNiveau' => 'required|string|max:50',
            'mensualiteNiveau' => 'required|string|max:50',
            'droitInscription' => 'required|numeric|max:50',
            'dureeNiveau' => 'required|numeric',
        ]);

        try {
            $tdNiveaux = TdNiveau::findOrFail($id);
            $tdNiveaux->update([
                'nomNiveau' => $request->nomNiveau,
                'mensualiteNiveau' => $request->mensualiteNiveau,
                'droitInscription' => $request->droitInscription,
                'dureeNiveau' => $request->dureeNiveau,
            ]);

            return response()->json($tdNiveaux);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Supprime la ressource spécifiée de la base.
     */
    public function destroy(string $id)
    {
        try {
            $tdNiveaux = TdNiveau::findOrFail($id);
            $tdNiveaux->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
