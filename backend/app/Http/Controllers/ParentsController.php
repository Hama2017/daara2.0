<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use Illuminate\Http\Request;

class ParentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $parents = Parents::all();
            return response()->json($parents);
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
                'NumeroTelephone' => 'nullable|string|max:10',
            ]);

            $parent = Parents::create($request->all());

            return response()->json($parent, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        try {
            $parent = Parents::findOrFail($id);
            return response()->json($parent);
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

            $parent = Parents::findOrFail($id);
            $parent->update($request->all());

            return response()->json($parent);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $parent = Parents::findOrFail($id);
            $parent->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
}
