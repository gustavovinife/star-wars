<?php

namespace Tests\Unit;

use App\Services\SwapiService;
use App\Services\StatisticsService;
use App\Helpers\CacheHelper;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;
use Mockery;

class SwapiServiceTest extends TestCase
{
    private SwapiService $service;
    private string $baseUrl;
    private $mockStatisticsService;

    protected function setUp(): void
    {
        parent::setUp();

        // Mock the StatisticsService
        $this->mockStatisticsService = Mockery::mock(StatisticsService::class);
        $this->mockStatisticsService->shouldReceive('trackQuery')->andReturn();

        $this->service = new SwapiService($this->mockStatisticsService);
        $this->baseUrl = env('SWAPI_EXTERNAL_API_URL') ?? 'https://swapi.dev/api';

        Cache::flush();
    }

    public function test_fetch_data_from_api_and_store_in_cache()
    {
        $mockData = ['results' => [['name' => 'Luke Skywalker']]];

        Http::fake([
            $this->baseUrl . '/people*' => Http::response($mockData, 200)
        ]);

        $result = $this->service->fetchWithCache('people', ['search' => 'luke']);

        $this->assertEquals($mockData, $result);

        $cacheKey = CacheHelper::generateKey('people', ['search' => 'luke']);
        $this->assertEquals($mockData, Cache::get($cacheKey));
    }

    public function test_get_data_from_cache_on_second_call()
    {
        $mockData = ['results' => [['name' => 'Leia Organa']]];

        Http::fake([
            $this->baseUrl . '/people*' => Http::response($mockData, 200)
        ]);

        $result1 = $this->service->fetchWithCache('people', ['search' => 'leia']);
        $result2 = $this->service->fetchWithCache('people', ['search' => 'leia']);

        $this->assertEquals($result1, $result2);

        Http::assertSentCount(1);
    }

    public function test_handles_api_error()
    {
        Http::fake([
            $this->baseUrl . '/people*' => Http::response(null, 500)
        ]);

        $result = $this->service->fetchWithCache('people', ['search' => 'test']);

        $this->assertNull($result);

        $cacheKey = CacheHelper::generateKey('people', ['search' => 'test']);
        $this->assertNull(Cache::get($cacheKey));
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
