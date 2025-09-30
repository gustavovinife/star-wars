<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;

class StatisticsService
{
    public function trackQuery(string $statsKey): void
    {
        Redis::incr("swapi:query_count:{$statsKey}");
        Redis::incr("swapi:total_queries");
    }

    public function getStatistics(): ?array
    {
        $statsJson = Redis::get('swapi:top_queries');

        if (!$statsJson) {
            return null;
        }

        if (is_array($statsJson)) {
            return $statsJson;
        }

        return json_decode($statsJson, true);
    }

    public function getTotalQueriesCount(): int
    {
        return Redis::get('swapi:total_queries', 0);
    }
}
