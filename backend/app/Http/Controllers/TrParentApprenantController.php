<?php

namespace App\Http\Controllers;

use App\Models\TrParentApprenant;
use Illuminate\Http\Request;
use App\Models\Apprenant;

class TrParentApprenantController extends Controller
{
    public function index()
    {
        try {
            $tpe = TrParentApprenant::all();
            return response()->json($tpe,200);
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
                'parent_id' => 'required|numeric',
                'apprenant_id' => 'required|numeric',
            ]);
            $tpe = TrParentApprenant::create([
                'parent_id' => $request->parent_id,
                'apprenant_id' => $request->apprenant_id
            ]);
            return response()->json($tpe,201);
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
            $tpe = Tr_Parent_Apprenant::findOrFail($id);
            return response()->json($tpe,200);
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
                'parent_id' => 'required|numeric',
                'apprenant_id' => 'required|numeric',
            ]);
            $tpe = Tr_Parent_Apprenant::findOrFail($id);
            $tpe->update([
                'parent_id' => $request->parent_id,
                'apprenant_id' => $request->apprenant_id,
            ]);

            return response()->json($tpe,200);
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
            $as = Tr_Parent_Apprenant::findOrFail($id);
            $as->delete();
            return response()->json("Record Deleted Successfully",200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
