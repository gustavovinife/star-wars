<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SwapiController;
use App\Http\Controllers\StatisticsController;

Route::get('/', function () {
    return view('welcome')->with('title', 'SWStarter');
});

Route::group(['prefix' => 'swapi'], function () {
    Route::get('/people', [SwapiController::class, 'people']);
    Route::get('/planets', [SwapiController::class, 'planets']);
    Route::get('/films', [SwapiController::class, 'films']);
});

Route::group(['prefix' => 'statistics'], function () {
    Route::get('/top-queries', [StatisticsController::class, 'topQueries']);
    Route::get('/trigger-computation', [StatisticsController::class, 'triggerComputation']);
});
