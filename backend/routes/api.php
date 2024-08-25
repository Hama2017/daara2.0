<?php

use App\Http\Controllers\ApprenantController;
use App\Http\Controllers\DocApprenantController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\TdNiveauController;
use App\Http\Controllers\TrDocApprenantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\DocDaaraController;
use App\Http\Controllers\DaaraController;
use App\Http\Controllers\TrDocDaaraController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('regions', RegionController::class);
Route::apiResource('departements', DepartementController::class);
Route::apiResource('doc-daaras', DocDaaraController::class);
Route::apiResource('daaras', DaaraController::class);
Route::apiResource('tr-doc-daaras', TrDocDaaraController::class);
Route::apiResource('inscriptions', InscriptionController::class);
Route::apiResource('tdNiveaux', TdNiveauController::class);
Route::apiResource('doc-apprenants', DocApprenantController::class);
Route::apiResource('apprenants', ApprenantController::class);
Route::apiResource('tr-doc-apprenants', TrDocApprenantController::class);
