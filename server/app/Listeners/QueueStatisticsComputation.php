<?php

namespace App\Listeners;

use App\Events\StatisticsUpdateRequested;
use App\Jobs\ComputeStatisticsJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class QueueStatisticsComputation
{

    public function __construct()
    {
        //
    }

    public function handle(StatisticsUpdateRequested $event): void
    {
        ComputeStatisticsJob::dispatch();
    }
}
