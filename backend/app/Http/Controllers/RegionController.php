<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function index()
    {
        try {
            $regions = Region::all();
            return response()->json($regions);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération des régions'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $region = Region::create($request->all());
            return response()->json($region, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la création de la région'], 500);
        }
    }

    public function show($id)
    {
        try {
            $region = Region::findOrFail($id);
            return response()->json($region);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Région non trouvée'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $region = Region::findOrFail($id);
            $region->update($request->all());
            return response()->json($region);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la mise à jour de la région'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $region = Region::findOrFail($id);
            $region->delete();
            return response()->json(['message' => 'Région supprimée avec succès']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la suppression de la région'], 500);
        }
    }
}

