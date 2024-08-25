<?php

namespace App\Http\Controllers;

use App\Models\trDisciplineEnseignant;
use App\Http\Requests\StoretrDisciplineEnseignantRequest;
use App\Http\Requests\UpdatetrDisciplineEnseignantRequest;
use Illuminate\Http\Request;

class TrDisciplineEnseignantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            //$trDisciplineEnseignant = trDisciplineEnseignant::all();
            $trDisciplineEnseignant = trDisciplineEnseignant::with(['enseignants','discipline'])->get();
            //$inscriptions = Inscription::with(['apprenant', 'daara','tdNiveau'])->get();
            return response()->json($trDisciplineEnseignant);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $trDisciplineEnseignant = trDisciplineEnseignant::create($request->all());
            return response()->json($trDisciplineEnseignant, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $trDisciplineEnseignant = trDisciplineEnseignant::findOrFail($id);
            return response()->json($trDisciplineEnseignant);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $trDisciplineEnseignant = trDisciplineEnseignant::findOrFail($id);
            $trDisciplineEnseignant->update($request->all());
            return response()->json($trDisciplineEnseignant);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $trDisciplineEnseignant = trDisciplineEnseignant::findOrFail($id);
            $trDisciplineEnseignant->delete();
            return response()->json(['message' => 'Supprimée avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
