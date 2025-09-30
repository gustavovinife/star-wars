<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StatisticsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class StatisticsController extends Controller
{
    protected StatisticsService $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    public function topQueries(): JsonResponse
    {
        $statistics = $this->statisticsService->getStatistics();

        if(!$statistics) {
            return response()->json([
                'message' => 'No statistics available yet. Statistics are computed every 5 minutes.
                You can trigger the computation manually by calling the /statistics/trigger-computation endpoint.',
            ]);
        }

        return response()->json($statistics);
    }

    // Manually trigger statistics computation
    public function triggerComputation(): JsonResponse
    {
        $job = new \App\Jobs\ComputeStatisticsJob();
        $statisticsService = app(\App\Services\StatisticsService::class);
        $job->handle($statisticsService);

        return response()->json([
            'message' => 'Statistics computation completed successfully',
        ]);
    }
}
