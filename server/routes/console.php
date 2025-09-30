<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Events\StatisticsUpdateRequested;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule statistics computation every 5 minutes
Schedule::call(function () {
    event(new StatisticsUpdateRequested());
})->everyFiveMinutes()
->name('swapi-statistics')
->description('Compute top 5 SWAPI queries with percentages')
->onOneServer()
->withoutOverlapping();
