<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use App\Helpers\CacheHelper;

class SwapiService
{
    protected string $baseUrl;
    protected StatisticsService $statistics;

    public function __construct(StatisticsService $statistics)
    {
        $this->baseUrl = env('SWAPI_EXTERNAL_API_URL') ?? 'https://swapi.dev/api';
        $this->statistics = $statistics;
    }

    public function fetchWithCache(string $endpoint, array $params): mixed
    {
        $cacheKey = CacheHelper::generateKey($endpoint, $params);
        $statsKey = CacheHelper::generateStatsKey($endpoint, $params);

        $this->statistics->trackQuery($statsKey);

        $cachedData = Cache::get($cacheKey);
        if ($cachedData) {
            return $cachedData;
        }

        //in case of cache miss, fetch from api
        $response = Http::get("{$this->baseUrl}/{$endpoint}", $params);

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();

        Cache::put($cacheKey, $data, CacheHelper::getTtl());

        return $data;
    }
}
