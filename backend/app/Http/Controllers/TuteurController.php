<?php

namespace App\Http\Controllers;

use App\Models\Tuteur;
use Illuminate\Http\Request;

class TuteurController extends Controller
{
    public function index()
    {
        try {
            $tuteurs = Tuteur::all();
            return response()->json($tuteurs);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'Nom' => 'required|string|max:50',
                'Prenom' => 'required|string|max:100',
                'Adresse' => 'required|string|max:80',
                'Sexe' => 'required|string|max:8',
                'Email' => 'nullable|string|email|max:30',
                'NumeroTelephone' => 'required|string|max:10',
            ]);

            $tuteur = Tuteur::create($request->all());

            return response()->json($tuteur, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        try {
            $tuteur = Tuteur::findOrFail($id);
            return response()->json($tuteur);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'Nom' => 'required|string|max:50',
                'Prenom' => 'required|string|max:100',
                'Adresse' => 'required|string|max:80',
                'Sexe' => 'required|string|max:8',
                'Email' => 'nullable|string|email|max:30',
                'NumeroTelephone' => 'required|string|max:10',
            ]);

            $tuteur = Tuteur::findOrFail($id);
            $tuteur->update($request->all());

            return response()->json($tuteur);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $tuteur = Tuteur::findOrFail($id);
            $tuteur->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
