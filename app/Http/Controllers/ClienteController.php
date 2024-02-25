<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Votantes;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Dompdf\Dompdf;
use Dompdf\Options;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $departamento = $request->departamento;
        $distrito = $request->distrito;
        $cargador = $request->cargador;
        $parametros = array($departamento, $distrito, $cargador);

        if(!empty($request->cedula)){
            $votante = Votantes::where('cedula', $request->cedula)->first();
            if(!empty($votante)){
                $puntero = User::select('name', 'apellido', 'telefono', 'creador_id', 'role')->where('id', $votante->puntero)
                ->where('role', '!=', 'Administrador')->first();
                $coordinador =  User::select('name', 'apellido', 'telefono', 'creador_id', 'role')->where('id', $puntero->creador_id)
                    ->where('role', 'Encargado')->first();
                if(!empty($coordinador->creador_id)){
                    $delegado = User::select('name', 'apellido', 'telefono', 'role')
                    ->where('id', $coordinador->creador_id)
                    ->where('role', 'Coordinador')
                    ->first();
                } else {
                    $delegado = User::select('name', 'apellido', 'telefono', 'role')
                    ->where('id', $puntero->creador_id)
                    ->where('role', 'Coordinador')
                    ->first();
                }
                return Inertia::render('Votantes/FilterText', compact('votante', 'puntero', 'coordinador', 'delegado'));
            } else{
                return Inertia::render('NotFound');
            }
        } else{
            if(empty($request->cargador) && empty($request->distrito)){
                $votantes = Votantes::where('nombre_departamento', $request->departamento)->paginate(10);
                $votantesCount = Votantes::where('nombre_departamento', $request->departamento)->count();
            } elseif(empty($request->cargador)){
                $votantes = Votantes::where('nombre_distrito', $request->distrito)->paginate(10);
                $votantesCount = Votantes::where('nombre_distrito', $request->distrito)->count();
            } elseif(!empty($request->cargador)){
                $votantes = Votantes::where('puntero', $request->cargador)->paginate(10);
                $votantesCount = Votantes::where('puntero', $request->cargador)->count();
                $cargadorName = User::select('name', 'apellido')->where('id', $request->cargador)->first();
            }
            return Inertia::render('Votantes/FilterSelect', compact('votantes', 'votantesCount', 'departamento', 'distrito', 'cargador', 'cargadorName', 'parametros'));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
}
