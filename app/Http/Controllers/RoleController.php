<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//Spatie
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class RoleController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:show-rol|create-rol|edit-rol|delete-rol', ['only'=>['index']]);
        $this->middleware('permission:create-rol', ['only'=>['create', 'store']]);
        $this->middleware('permission:edit-rol', ['only'=>['edit', 'update']]);
        $this->middleware('permission:delete-rol', ['only'=>['destroy']]);
    }

    public function index()
    {
        $roles = Role::paginate(5);
        $permisos = Permission::all();
        return Inertia::render('Roles/Index', compact('roles', 'permisos'));
    }

   
    public function create()
    {
        $permission = Permission::get();
        return Inertia::render('Roles/Crear', compact('permission'));
    }

 
    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'required', 'permission' => 'required']);
        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));

        return to_route('roles.index');
    }


    public function edit(string $id)
    {
        $role = Role::find($id);
        $permission = Permission::get();
        $rolePermission = DB::table('role_has_permissions')->where('role_has_permissions.role_id', $id)
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();

        return Inertia::render('Roles/Editar', compact('role', 'permission', 'rolePermission'));
    }


    public function destroy(string $id)
    {
        DB::table('roles')->where('id', $id)->delete();
        return to_route('roles.index');
    }
}
