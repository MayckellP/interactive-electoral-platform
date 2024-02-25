<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\User;
use App\Models\Votantes;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class EmpleadoController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:show-user|create-user|edit-user|delete-user', ['only'=>['index']]);
        $this->middleware('permission:create-user', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-user', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-user', ['only'=>['destroy']]);
    }
   
    public function index()
    {
        $myUser = Auth::user();
        $myDep = $myUser->nombre_departamento;
        $myDist = $myUser->nombre_distrito;
        $myId = $myUser->id;

        $userCount  = User::count();
        $users = User::paginate(10);

        $userPerRole = User::where('creador_id', $myId)
        ->orWhere(function ($query) use ($myId) {
            $query->where('role', 'puntero')
                  ->whereIn('creador_id', function ($subquery) use ($myId) {
                      $subquery->select('id')
                              ->from('users')
                              ->where('creador_id', $myId);
                  });
        })
        ->paginate(10);

        $userCountPerRole = User::where('creador_id', $myId)
        ->orWhere(function ($query) use ($myId) {
            $query->where('role', 'puntero')
                  ->whereIn('creador_id', function ($subquery) use ($myId) {
                      $subquery->select('id')
                              ->from('users')
                              ->where('creador_id', $myId);
                  });
        })
        ->count();
 
        return Inertia::render('Usuarios/Index', compact('users', 'userCount', 'userPerRole', 'userCountPerRole'));
    }

   
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Usuarios/Crear', compact('roles'));
    }

    
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'apellido' => 'required',
            'cedula' => 'required|unique:users',
            'direccion' => 'required',
            'telefono' => 'required',
            'password' => 'required|same:password_confirmation',
            'role' => 'required',
            'creador_id' => 'required',
            'departamento' => 'required',
            'nombre_departamento' => 'required',
            'distrito' => 'required',
            'nombre_distrito' => 'required',
        ]); 
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('role'));

        return to_route('usuarios.index');
    }

   
    public function edit(Empleado $empleado, $id)
    {
        $user = User::find($id);
        $roles = Role::all();
        $userRole = $user->roles->pluck('name', 'name')->all();

        return Inertia::render('Usuarios/Editar', compact('user', 'roles', 'userRole'));
    }

   
    public function update(Request $request, $id)
    {
        $input = $request->all();
        if(!empty($input['password'])){
            $input['password'] = Hash::make($input['password']);
        } else{
            $input = Arr::except($input, array('password'));
        }

        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id', $id)->delete();
        $user->assignRole($request->input('role'));

        return to_route('usuarios.index');
    }

    
    public function destroy($id)
    {
        User::find($id)->delete();

        return to_route('usuarios.index');
    }
}
