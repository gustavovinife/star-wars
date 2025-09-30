<?php

namespace App\Helpers;

class CacheHelper
{
    public static function generateKey(string $endpoint, array $params): string
    {
        $paramsString = http_build_query($params);
        return "swapi:{$endpoint}:" . md5($paramsString);
    }

    public static function getTtl(): int
    {
        return env('SWAPI_CACHE_TTL', 3600); // Default 1 hour
    }

    public static function generateStatsKey(string $endpoint, array $params): ?string
    {
        if (!isset($params['search']) || empty($params['search'])) {
            return null;
        }

        $searchTerm = $params['search'];
        return strtolower($endpoint . ':' . $searchTerm);
    }
}
