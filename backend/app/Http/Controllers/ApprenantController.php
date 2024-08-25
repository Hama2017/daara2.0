<?php

namespace App\Http\Controllers;

use App\Models\Apprenant;
use Illuminate\Http\Request;

class ApprenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $apprenants = Apprenant::all();
            return response()->json($apprenants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des apprenants'], 500);
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
            $request->validate([
                'matriculeApprenant' => 'required|string|max:50',
                'prenomApprenant' => 'required|string|max:100',
                'nomApprenant' => 'required|string|max:80',
                'dateNaissApprenant' => 'required|date|max:8',
                'lieuNaissApprenant' => 'required|string|email|max:30',
                'sexeApprenant' => 'required|string|max:10',
            ]);

            $apprenants =Apprenant::create($request->all());

            return response()->json($apprenants, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $apprenants = Apprenant::findOrFail($id);
            return response()->json($apprenants);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Apprenant $apprenant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        try {
            $request->validate([
                'matriculeApprenant' => 'required|string|max:50',
                'prenomApprenant' => 'required|string|max:100',
                'nomApprenant' => 'required|string|max:80',
                'dateNaissApprenant' => 'required|date|max:8',
                'lieuNaissApprenant' => 'required|string|email|max:30',
                'sexeApprenant' => 'required|string|max:10',
            ]);

            $apprenants = Apprenant::findOrFail($id);
            $apprenants->update($request->all());

            return response()->json($apprenants);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $apprenants = Apprenant::findOrFail($id);
            $apprenants->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
