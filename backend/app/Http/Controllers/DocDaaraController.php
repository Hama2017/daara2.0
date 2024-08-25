<?php

namespace App\Http\Controllers;

use App\Models\DocDaara;
use Illuminate\Http\Request;

class DocDaaraController extends Controller
{
    public function index()
    {
        try {
            $doc_daaras = DocDaara::all();
            return response()->json($doc_daaras);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des documents'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $doc_daara = DocDaara::create($request->all());
            return response()->json($doc_daara, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la création du document'], 500);
        }
    }

    public function show($id)
    {
        try {
            $doc_daara = DocDaara::findOrFail($id);
            return response()->json($doc_daara);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Document non trouvé'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $doc_daara = DocDaara::findOrFail($id);
            $doc_daara->update($request->all());
            return response()->json($doc_daara);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la mise à jour du document'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $doc_daara = DocDaara::findOrFail($id);
            $doc_daara->delete();
            return response()->json(['message' => 'Document supprimé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la suppression du document'], 500);
        }
    }
}