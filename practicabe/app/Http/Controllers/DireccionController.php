<?php

namespace App\Http\Controllers;

use App\Models\Direccion;
use Illuminate\Http\Request;

class DireccionController extends Controller
{
    public function index() {
        return response()->json(Direccion::all());
    }

    public function store(Request $request){
        $this->validate($request, [
            'calle' => 'required|string',
            'numero' => 'required|string|max:10',
            'colonia' => 'required|string',
            'ciudad' => 'required|string',
            'estado' => 'required|string',
            'codigo_postal' => 'required|string|max:10',
        ]);
        
        $direccion = Direccion::create($request->all());
        return response()->json($direccion);
    }

    // MÉTODO CORREGIDO: Se agregaron los parámetros Request e id
    public function update(Request $request, $id){
        $this->validate($request, [
            'calle' => 'required|string',
            'numero' => 'required|string|max:10',
            'colonia' => 'required|string',
            'ciudad' => 'required|string',
            'estado' => 'required|string',
            'codigo_postal' => 'required|string|max:10',
        ]);

        $direccion = Direccion::findOrFail($id);
        $direccion->update($request->all());

        return response()->json([
            "message" => "Se ha actualizado correctamente la direccion",
            "data" => $direccion
        ]);
    }

    public function show($id){
        $direccion = Direccion::findOrFail($id);
        return response()->json($direccion);
    }
    
    public function destroy($id){
        Direccion::destroy($id);
        return response()->json(['message' => 'Dirección eliminada correctamente']);
    }
}