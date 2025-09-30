<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Events\StatisticsUpdateRequested;
use App\Listeners\QueueStatisticsComputation;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Event::listen(
            StatisticsUpdateRequested::class,
            QueueStatisticsComputation::class
        );
    }
}
