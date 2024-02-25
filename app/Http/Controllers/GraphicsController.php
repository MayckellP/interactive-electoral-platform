<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Votantes;
use App\Models\User;
use Spatie\Permission\Models\Role;


use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VotantesController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\GraphicsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;



class GraphicsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // MI ID
        $myID = Auth::user()->id;
        $myRole = Auth::user()->role;

        // MOSTRAR VOTANTES EN LA TABLA DEL DASHBOARD - MAX 10
        $votantes = Votantes::inRandomOrder()->limit(10)->get();

        //-----------------------------------------------------------------------------------ROLE "ADMINISTRADOR"

        // MOSTRAR CANTIDAD TOTAL POR ROLE DE COORD. ENCARG. Y PUNTEROS
        $userQuantity = DB::table(DB::raw("
            (SELECT 'Delegado' as role
            UNION ALL
            SELECT 'Coordinador' as role
            UNION ALL
            SELECT 'Puntero' as role) as r"))
            ->leftJoin('users as u', 'r.role', '=', 'u.role')
            ->select('r.role', DB::raw('IFNULL(COUNT(u.id), 0) as cantidad_users'))
            ->groupBy('r.role')
            ->get();


        /* ---------------------GRAFICO PARA EL ADMIN */
        $votantesPorDepartamento = DB::table('votantes')
            ->select('nombre_departamento', DB::raw('COUNT(*) as cantidad_votantes'))
            ->groupBy('nombre_departamento')
            ->get();

        
        //-----------------------------------------------------------------------------------ROLE "COORDINADOR"

        // MOSTRAR TOTAL DE ENCARGADOS PARA EL COORDINADOR
        $quantityEncargados = User::where('creador_id', $myID)
        ->orWhere(function ($query) use ($myID) {
            $query->where('role', 'Puntero')
                  ->whereIn('creador_id', function ($subquery) use ($myID) {
                      $subquery->select('id')
                              ->from('users')
                              ->where('creador_id', $myID);
                  });
        })
        ->count();

         // MOSTRAR TOTAL DE PUNTEROS PARA EL COORDINADOR
         $quantityCargadores = User::where(function ($query) use ($myID) {
            $query->where('role', 'Puntero')
                ->where('creador_id', $myID);
        })->orWhere(function ($query) use ($myID) {
            $query->where('role', 'Puntero')
                ->whereIn('creador_id', function ($subquery) use ($myID) {
                    $subquery->select('id')
                        ->from('users')
                        ->where('role', 'Coordinador')
                        ->where('creador_id', $myID);
                });
        })->count();

        /* ---------------------GRAFICO PARA EL COORDINADOR*/
        $votantesPorDistrito = DB::table('votantes as v')
            ->select([
                'v.nombre_departamento as nombre_departamento',
                'v.nombre_distrito as nombre_distrito',
                DB::raw('SUM(CASE WHEN u.role = "Delegado" AND u.id = ' . $myID . ' THEN 1 ELSE 0 END) as votantes_ingresados_por_coordinador'),
                DB::raw('SUM(CASE WHEN u.role IN ("Coordinador", "Puntero") AND u.creador_id = ' . $myID . ' THEN 1 ELSE 0 END) as votantes_ingresados_por_encargado_o_puntero'),
                DB::raw('SUM(CASE WHEN u.role = "Puntero" AND u.creador_id IN (SELECT id FROM users WHERE role = "Coordinador" AND creador_id = ' . $myID . ') THEN 1 ELSE 0 END) as votantes_ingresados_por_puntero'),
                DB::raw('SUM(CASE WHEN u.role IN ("Delegado", "Coordinador", "Puntero") AND (u.id = ' . $myID . ' OR u.creador_id = ' . $myID . ' OR u.creador_id IN (SELECT id FROM users WHERE role = "Coordinador" AND creador_id = ' . $myID . ')) THEN 1 ELSE 0 END) as cantidad_votantes')
            ])
            ->leftJoin('users as u', 'v.puntero', '=', 'u.id')
            ->where('u.id', '=', $myID)
            ->orWhere('u.creador_id', '=', $myID)
            ->orWhereIn('u.creador_id', function ($query) use ($myID) {
                $query->select('id')
                    ->from('users')
                    ->where('role', 'Coordinador')
                    ->where('creador_id', $myID);
            })
            ->groupBy('v.nombre_departamento', 'v.nombre_distrito')
            ->get();



        //-----------------------------------------------------------------------------------ROLE "ENCARGADO"

        //--------------------- GRAFICO PARA EL ENCARGADO Y CANTIDAD DE PUNTEROS 
        $cargadoresPorEncargado = DB::table('users as u')
        ->leftJoin('votantes as v', 'u.id', '=', 'v.puntero')
        ->select('u.id as user_id', 'u.name as user_nombre', 'u.apellido as user_apellido', DB::raw('COUNT(v.id) as cantidad_votantes'))
        ->where('u.creador_id', '=', $myID)
        ->groupBy('u.id', 'u.name', 'u.apellido')
        ->get();


        // Obtén la fecha del primer registro de votantes
        $primerMes = DB::table('votantes')
        ->select(DB::raw('DATE_FORMAT(MIN(created_at), "%Y-%m") as primer_mes'))
        ->value('primer_mes');

        if ($primerMes) {
            $primerMes = Carbon::parse($primerMes);
        
            $meses = collect(range(0, 11))->map(function ($n) use ($primerMes) {
                return $primerMes->copy()->addMonths($n)->format('Y-m');
            });
        
            $query = DB::table('votantes')
                ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as mes")
                ->selectRaw("COUNT(id) as cantidad_votantes_ingresados")
                ->whereIn(DB::raw("DATE_FORMAT(created_at, '%Y-%m')"), $meses)
                ->groupBy('mes');

            //-----------------CONDICION PARA AGREGAR FILTRO A LA CONSULTA
            if ($myRole === "Puntero") {
                $query->where('puntero', $myID);
            } elseif($myRole === "Delegado"){
                $query->where('nombre_departamento', Auth::user()->nombre_departamento);
            } elseif($myRole === "Coordinador"){
                $query->where('nombre_distrito', Auth::user()->nombre_distrito);
            }
            $results = $query->get();
        
            // Asegurémonos de que los meses sin votantes tengan una entrada con cero
            $allMonths = collect(range(0, 11))->map(function ($n) use ($primerMes) {
                return $primerMes->copy()->addMonths($n)->format('Y-m');
            });
        
            $results = $allMonths->map(function ($month) use ($results) {
                $result = $results->firstWhere('mes', $month);
            
                if ($result === null) {
                    return (object) [
                        'mes' => $month,
                        'cantidad_votantes_ingresados' => 0,
                    ];
                }
            
                return $result;
            });
        } else {
            $results = collect();
        }

        //-----------------ADICION DE RESULTADO A VARIABLES
        $votantesPorPuntero = $results;
        $chartLeft = $results;

        // MOSTRAR TOTAL DE VOTANTES INGRESADOS POR EL PUNTERO
        $quantityVotantes = Votantes::where('puntero', $myID)->count();

        return Inertia::render('Dashboard', compact('votantes', 'userQuantity', 'votantesPorDepartamento', 'votantesPorDistrito','cargadoresPorEncargado', 'votantesPorPuntero', 'quantityVotantes', 'quantityCargadores', 'quantityEncargados', 'chartLeft' ));
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
            if($request->has('puntero')){

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


                $consultaDB = DB::table('main_db')
                ->select(
                    'main_db.nombre', 'main_db.apellido', 
                    'main_db.cedula', 'main_db.direccion', 
                    'main_db.depart', 'main_db.ndepart', 
                    'main_db.distrito', 'main_db.ndistrito',
                    'main_db.sexo'
                    )->where('cedula', '=', $request->cedula)->get(); 

                
                $noDataAlert = false;
                if(sizeof($consultaDB) === 0){
                    $noDataAlert = true;
                }
                //dd($noDataAlert);
                $repeatAlert = Votantes::where('cedula', '=', $request->cedula)->count();

                return Inertia::render('Votantes/Crear', compact('consultaDB', 'repeatAlert', 'noDataAlert', 'votantesCount'));
            } elseif($request->has('creador_id')){

                $roles = Role::all();

                $consultaDB = DB::table('main_db')
                ->select(
                    'main_db.nombre', 'main_db.apellido', 
                    'main_db.cedula', 'main_db.direccion', 
                    'main_db.depart', 'main_db.ndepart', 
                    'main_db.distrito', 'main_db.ndistrito',
                    'main_db.sexo'
                    )->where('cedula', '=', $request->cedula)->get(); 

                $noDataAlert = false;
                if(sizeof($consultaDB) === 0){
                    $noDataAlert = true;
                }
                //dd($noDataAlert);
                $repeatAlert = User::where('cedula', '=', $request->cedula)->count();
    

                return Inertia::render('Usuarios/Crear', compact('roles', 'consultaDB', 'repeatAlert', 'noDataAlert'));
            } else{
                $consultaDB = DB::table('main_db')
                ->select(
                    'main_db.nombre', 'main_db.apellido', 
                    'main_db.ndepart', 'main_db.ndistrito', 
                    'main_db.descripcio', 'main_db.nombre_loc', 
                    'main_db.mesa', 'main_db.codigo_sec', 
                    'main_db.nombre_sec', 'main_db.orden', 
                    'main_db.v_nov_2015', 'main_db.v_dic_2017',
                    'main_db.v_dic_2018', 'main_db.v_jun_2021', 
                    'main_db.v_oct_2021', 'main_db.v_dic_2022' 
                    )->where('cedula', '=', $request->cedula)->get(); 

                return Inertia::render('ConsultPage', compact('consultaDB'));
            }
            
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $myRole = Auth::user()->role;
        $dataGraphic = [
        ];

        //Obtener todos los delegados con sus respectivos departamentos
        $delegados = User::select('id','name', 'nombre_departamento', 'departamento', 'distrito', 'nombre_distrito')->where('role', 'Delegado')->get();
        $coordinadores = User::select('id','name', 'nombre_departamento', 'departamento', 'distrito', 'nombre_distrito', 'creador_id')->where('role', 'Coordinador')->get();
        $punteros = User::select(
            'id',
            'name',
            'apellido',
            'creador_id',
            'nombre_departamento',
            'nombre_distrito',
        )
        ->selectSub(function ($query) {
            $query->selectRaw('COUNT(*)')
                ->from('votantes')
                ->whereColumn('votantes.puntero', '=', 'users.id');
        }, 'total_votantes_por_punter')
        ->where('role', 'Puntero')
        ->get();

        $general_graphics = User::select(
            'd.id AS delegado_id',
            'd.name AS delegado_name',
            'd.departamento AS id_departamento',
            'd.nombre_departamento AS departamento',
            'd.distrito AS id_distrito',
            'd.nombre_distrito AS distrito',
            'c.id AS coordinador_id',
            'c.name AS coordinador_name',
            'c.nombre_departamento AS coordinador_nombre_departamento',
            'c.departamento AS coordinador_departamento',
            'c.distrito AS coordinador_distrito',
            'c.nombre_distrito AS coordinador_nombre_distrito',
            'p.name AS puntero_name'
        )
        ->addSelect(DB::raw('(SELECT COUNT(*) FROM votantes v WHERE v.puntero = p.id) AS total_votantes_por_puntero'))
        ->from('users AS c')
        ->leftJoin('users AS d', function ($join) {
            $join->on('c.creador_id', '=', 'd.id')
                ->where('c.role', '=', 'Coordinador')
                ->where('d.role', '=', 'Delegado');
        })
        ->leftJoin('users AS p', function ($join) {
            $join->on(function ($query) {
                $query->on('c.id', '=', 'p.creador_id')
                    ->orOn('d.id', '=', 'p.creador_id');
            })
            ->where('p.role', '=', 'Puntero');
        })
        ->where(function ($query) {
            $query->where('c.role', '=', 'Coordinador')
                ->orWhere('d.role', '=', 'Delegado');
        })
        ->whereNotNull('p.id')
        ->get();
        
        

        $chartLeft = DB::table('users as d')
        ->join('users as c', 'd.id', '=', 'c.creador_id')
        ->join('users as p', 'c.id', '=', 'p.creador_id')
        ->crossJoin(DB::raw("(
            SELECT '2023-01' AS month UNION SELECT '2023-02' UNION SELECT '2023-03' UNION
            SELECT '2023-04' UNION SELECT '2023-05' UNION SELECT '2023-06' UNION
            SELECT '2023-07' UNION SELECT '2023-08' UNION SELECT '2023-09' UNION
            SELECT '2023-10' UNION SELECT '2023-11' UNION SELECT '2023-12'
        ) as temp_months"))
        ->leftJoin('votantes as v', function ($join) {
            $join->on('v.puntero', '=', 'p.id')
                ->on('p.creador_id', '=', 'c.id')
                ->on('c.creador_id', '=', 'd.id');
        })
        ->groupBy('d.id', 'temp_months.month')
        ->orderBy('d.id', 'asc')
        ->orderBy('temp_months.month', 'asc')
        ->select([
            'd.id as dele_id',
            'temp_months.month as mes_ingreso',
            DB::raw('COUNT(v.id) as cantidad_votantes_total'),
            DB::raw('COUNT(CASE WHEN DATE_FORMAT(v.created_at, "%Y-%m") = temp_months.month THEN 1 ELSE NULL END) as cantidad_votantes_por_mes')
        ])
        ->get(); 
    

        return Inertia::render('GraphicsDetail', compact('chartLeft', 'delegados', 'coordinadores', 'punteros', 'general_graphics'));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
