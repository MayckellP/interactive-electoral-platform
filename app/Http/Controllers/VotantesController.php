<?php

namespace App\Http\Controllers;

use App\Models\Votantes;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Dompdf\Dompdf;
use Dompdf\Options;

class VotantesController extends Controller
{
    
    function __construct()
    {
        $this->middleware('permission:show-votante|create-votante|edit-votante|delete-votante', ['only'=>['index']]);
        $this->middleware('permission:create-votante', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-votante', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-votante', ['only'=>['destroy']]);
    }

    public function index()
    {
        $myRole = Auth::user()->role;
        $votantes;

        if($myRole === "Administrador"){
            $votantes = Votantes::paginate(3);
        } elseif($myRole === "Delegado"){
            $votantes = Votantes::where('nombre_departamento', Auth::user()->nombre_departamento)->paginate(10);
           // dd($votantes->all());
        } elseif($myRole === "Coordinador"){
            $votantes = Votantes::where('nombre_distrito', Auth::user()->nombre_distrito)->paginate(10);
        } elseif($myRole === "Puntero"){
            $votantes = Votantes::where('puntero', Auth::user()->id)->paginate(10);
        }
        

        $votantesCount = Votantes::count();
        $departamentos = Votantes::distinct('nombre_departamento')
            ->orderBy('nombre_departamento')
            ->pluck('nombre_departamento');
        $distritos = Votantes::select('nombre_departamento', 'nombre_distrito')
        ->distinct()
        ->orderBy('nombre_distrito')
        ->get();
        $cargador = Votantes::select('v.nombre_distrito', 'v.puntero', 'u.name')
        ->from('votantes as v')
        ->leftJoin('users as u', 'v.puntero', '=', 'u.id')
        ->distinct()
        ->orderBy('u.name')
        ->get();

        return Inertia::render('Votantes/Index', compact('votantes', 'votantesCount', 'departamentos', 'distritos', 'cargador'));
    }

    public function create()
    {
        $myRole = Auth::user()->role;
        $votantesCount;

        if($myRole === "Administrador"){
            $votantesCount = Votantes::count();
        } elseif($myRole === "Delegado"){
            $votantesCount = Votantes::where('nombre_departamento', Auth::user()->nombre_departamento)->count();
           // dd($votantes->all());
        } elseif($myRole === "Coordinador"){
            $votantesCount = Votantes::where('nombre_distrito', Auth::user()->nombre_distrito)->count();
        } elseif($myRole === "Puntero"){
            $votantesCount = Votantes::where('puntero', Auth::user()->id)->count();
        }

        $votantesDB = Votantes::select('cedula')->get();
        return Inertia::render('Votantes/Crear', compact('votantesDB', 'votantesCount'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'cedula' => 'required',
            'telefono' => 'required',
            'direccion' => 'required',
            'departamento' => 'required',
            'nombre_departamento' => 'required',
            'distrito' => 'required',
            'nombre_distrito' => 'required',
            'puntero' => 'required'
        ]);

        $request = Votantes::create($validated);
        return to_route('dashboard');
    }

    public function show($identifier, Request $request)
    {
        if($identifier === "PDF_total"){
            $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
                ->paginate(100000);
            $consultaCount = Votantes::count();
        
            return Inertia::render('Votantes/Files', compact('consultaDB', 'consultaCount', 'identifier'));   

        } elseif( $identifier === "EXCEL_total"){
            $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
                ->paginate(1000000);
            $consultaCount = Votantes::count();
    
            return Inertia::render('Votantes/Files', compact('consultaDB', 'consultaCount', 'identifier'));   

        }elseif( $identifier === "PDF_select"){
            if(empty($request->cargador) && empty($request->distrito)){
                $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
               ->where('nombre_departamento', $request->departamento)
                ->paginate(100000);
                $consultaCount = Votantes::where('nombre_departamento', $request->departamento)->count();
            } elseif(empty($request->cargador)){
                $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
                ->where('nombre_distrito', $request->distrito)
                ->paginate(100000);
                $consultaCount = Votantes::where('nombre_distrito', $request->distrito)->count();
                
            } elseif(!empty($request->cargador)){
                $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
                ->where('puntero', $request->cargador)
                ->paginate(100000);
                $consultaCount = Votantes::where('puntero', $request->cargador)->count();
                
            }
        
            return Inertia::render('Votantes/Files', compact('consultaDB', 'consultaCount', 'identifier'));  

        } elseif( $identifier === "EXCEL_select"){
            if(empty($request->cargador) && empty($request->distrito)){
                $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
               ->where('nombre_departamento', $request->departamento)
                ->paginate(1000000);
                $consultaCount = Votantes::where('nombre_departamento', $request->departamento)->count();
            } elseif(empty($request->cargador)){
                $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
                ->where('nombre_distrito', $request->distrito)
                ->paginate(1000000);
                $consultaCount = Votantes::where('nombre_distrito', $request->distrito)->count();
                
            } elseif(!empty($request->cargador)){
                $consultaDB = Votantes::select('nombre', 'apellido', 'cedula')
                ->where('puntero', $request->cargador)
                ->paginate(1000000);
                $consultaCount = Votantes::where('puntero', $request->cargador)->count();
                
            }
        
            return Inertia::render('Votantes/Files', compact('consultaDB', 'consultaCount', 'identifier'));  
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Votantes $votantes)
    {
        return Inertia::render('Votantes/Editar', compact('votantes'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Votantes $votantes)
    {
        request()->validate([
            'title' => 'required',
            'content' => 'required'
        ]);
        $votantes->update($request->all());

        return to_route('votantes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $votantes->delete();
        return to_route('votantes.index');
    }
}
