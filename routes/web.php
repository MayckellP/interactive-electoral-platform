<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VotantesController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\GraphicsController;
use App\Http\Controllers\ClienteController;
use Illuminate\Support\Facades\DB;
use App\Models\Votantes;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [GraphicsController::class, 'index'])->name('dashboard');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Route::resource('dashboard', GraphicsController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth', 'verified'])->name('dashboard');
/* Route::get('dashboard', function () {
    
})->middleware(['auth', 'verified'])->name('dashboard'); */
Route::resource('consulta', GraphicsController::class)->only('create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('graphics', GraphicsController::class)->only('show')->middleware(['auth']);

Route::resource('usuarios', EmpleadoController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('roles', RoleController::class)->only('index', 'create', 'store', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('votantes', VotantesController::class)->only('index', 'create', 'store', 'show', 'edit', 'update', 'destroy')->middleware(['auth']);

Route::resource('filtroVotantes', ClienteController::class)->only('index', 'create', 'store', 'show', 'edit', 'update', 'destroy')->middleware(['auth']);

//Route::resource('graphics', GraphicsController::class)->only('show')->middleware(['auth']);

Route::get('consulta', function () {
    return Inertia::render('ConsultPage');
})->middleware(['auth', 'verified'])->name('consulta');

require __DIR__.'/auth.php';
