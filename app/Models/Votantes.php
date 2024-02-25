<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//Spatie
use Spatie\Permission\Traits\HasRoles;

class Votantes extends Model
{
    use HasFactory, HasRoles;


    protected $fillable = [
        'nombre',
        'apellido',
        'cedula',
        'telefono',
        'email',
        'direccion',
        'departamento',
        'nombre_departamento',
        'distrito',
        'nombre_distrito',
        'puntero',
    ];
}
