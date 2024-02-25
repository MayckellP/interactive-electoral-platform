<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//SPATIE
use Spatie\Permission\Models\Permission;

class SeederTablaPermisos extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permisos =[
            //ROLES
            'show-rol',
            'create-rol',
            'edit-rol',
            'delete-rol',

            //USERS
            'show-user',
            'create-user',
            'edit-user',
            'delete-user',

            //VOTANTES
            'show-votante',
            'create-votante',
            'edit-votante',
            'delete-votante',
        ];

        foreach($permisos as $permiso){
            Permission::create(['name' => $permiso]);
        }
    }
}
