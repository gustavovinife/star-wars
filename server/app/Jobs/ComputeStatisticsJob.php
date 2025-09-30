<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Redis;
use App\Services\StatisticsService;

class ComputeStatisticsJob implements ShouldQueue
{
    use Queueable;

    public function handle(StatisticsService $statisticsService): void
    {
        $queryKeys = Redis::keys('*query_count:*');
        $totalQueries = Redis::get('swapi:total_queries') ?? 0;

        if (empty($queryKeys) || $totalQueries == 0) {
            return;
        }

        $queryCounts = [];
        foreach ($queryKeys as $key) {
            //remove default laravel-database- prefix
            $keyWithoutPrefix = preg_replace('/^laravel-database-/', '', $key);
            $count = Redis::get($keyWithoutPrefix);
            $queryName = str_replace('swapi:query_count:', '', $keyWithoutPrefix);

            if ($count > 0) {
                $queryCounts[$queryName] = (int) $count;
            }
        }

        arsort($queryCounts);
        $topQueries = array_slice($queryCounts, 0, 5, true);

        $result = [
            'top_queries' => [],
            'total_queries' => (int) $totalQueries,
        ];

        foreach ($topQueries as $query => $count) {
            $percentage = round(($count / $totalQueries) * 100, 2);
            $result['top_queries'][] = [
                'query' => $query,
                'count' => $count,
                'percentage' => $percentage
            ];
        }

        Redis::set('swapi:top_queries', json_encode($result));
    }
}
