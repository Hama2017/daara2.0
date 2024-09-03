<?php

namespace App\Http\Controllers;

use App\Models\TypeDocument;
use Illuminate\Http\Request;

class TypeDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $typeDocuments = TypeDocument::all();
            return response()->json($typeDocuments, 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
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
                'Nom' => 'required|string|max:30',
                'TypeDoc' => 'required|string|max:30',
                'Statut' => 'required|string|max:20',
            ]);

            $typeDocument = TypeDocument::create([
                'Nom' => $request->Nom,
                'TypeDoc' => $request->TypeDoc,
                'Statut' => $request->Statut,
            ]);

            return response()->json($typeDocument, 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $typeDocument = TypeDocument::findOrFail($id);
            return response()->json($typeDocument, 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'Nom' => 'required|string|max:30',
                'TypeDoc' => 'required|string|max:30',
                'Statut' => 'required|string|max:20',
            ]);

            $typeDocument = TypeDocument::findOrFail($id);
            $typeDocument->update([
                'Nom' => $request->Nom,
                'TypeDoc' => $request->TypeDoc,
                'Statut' => $request->Statut,
            ]);

            return response()->json($typeDocument, 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $typeDocument = TypeDocument::findOrFail($id);
            $typeDocument->delete();
            return response()->json("Record Deleted Successfully", 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
