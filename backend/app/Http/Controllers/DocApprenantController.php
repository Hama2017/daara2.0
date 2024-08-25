<?php

namespace App\Http\Controllers;

use App\Models\DocApprenant;
use Illuminate\Http\Request;

class DocApprenantController extends Controller
{
    public function index()
    {
        try {
            $doc_apprenants = DocApprenant::all();
            return response()->json($doc_apprenants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des documents'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $doc_apprenants = DocApprenant::create($request->all());
            return response()->json($doc_apprenants, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la création du document'], 500);
        }
    }

    public function show($id)
    {
        try {
            $doc_apprenants = DocApprenant::findOrFail($id);
            return response()->json($doc_apprenants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Document non trouvé'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $doc_apprenants = DocApprenant::findOrFail($id);
            $doc_apprenants->update($request->all());
            return response()->json($doc_apprenants);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la mise à jour du document'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $doc_apprenants = DocApprenant::findOrFail($id);
            $doc_apprenants->delete();
            return response()->json(['message' => 'Document supprimé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la suppression du document'], 500);
        }
    }
}
