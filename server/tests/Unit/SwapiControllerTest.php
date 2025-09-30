<?php

namespace Tests\Unit;

use App\Http\Controllers\SwapiController;
use App\Http\Requests\PeopleRequest;
use App\Http\Requests\PlanetsRequest;
use App\Http\Requests\FilmsRequest;
use App\Services\SwapiService;
use Tests\TestCase;
use Mockery;

class SwapiControllerTest extends TestCase
{
    private $controller;
    private $mockService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->mockService = Mockery::mock(SwapiService::class);
        $this->controller = new SwapiController($this->mockService);
    }

    public function test_people_method_returns_data()
    {
        $mockData = [
            'results' => [
                ['name' => 'Obi-Wan Kenobi']
            ]
        ];

        $request = Mockery::mock(PeopleRequest::class);
        $request->shouldReceive('validated')
                ->once()
                ->andReturn(['name' => 'obi']);

        $this->mockService
            ->shouldReceive('fetchWithCache')
            ->once()
            ->with('people', ['search' => 'obi'])
            ->andReturn($mockData);

        $response = $this->controller->people($request);

        $this->assertEquals(200, $response->getStatusCode());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals($mockData, $responseData);
    }

    public function test_planets_method_returns_data()
    {
        $mockData = [
            'results' => [
                ['name' => 'Tatooine']
            ]
        ];

        $request = Mockery::mock(PlanetsRequest::class);
        $request->shouldReceive('validated')
                ->once()
                ->andReturn(['name' => 'tat']);

        $this->mockService
            ->shouldReceive('fetchWithCache')
            ->once()
            ->with('planets', ['search' => 'tat'])
            ->andReturn($mockData);

        $response = $this->controller->planets($request);

        $this->assertEquals(200, $response->getStatusCode());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals($mockData, $responseData);
    }

    public function test_films_method_returns_data()
    {
        $mockData = [
            'results' => [
                ['title' => 'A New Hope']
            ]
        ];

        $request = Mockery::mock(FilmsRequest::class);
        $request->shouldReceive('validated')
                ->once()
                ->andReturn(['name' => 'new']);

        $this->mockService
            ->shouldReceive('fetchWithCache')
            ->once()
            ->with('films', ['search' => 'new'])
            ->andReturn($mockData);

        $response = $this->controller->films($request);

        $this->assertEquals(200, $response->getStatusCode());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals($mockData, $responseData);
    }

    public function test_people_method_calls_service_with_correct_parameters()
    {
        $expectedData = ['results' => []];

        $request = Mockery::mock(PeopleRequest::class);
        $request->shouldReceive('validated')
                ->once()
                ->andReturn(['name' => 'luke']);

        $this->mockService
            ->shouldReceive('fetchWithCache')
            ->once()
            ->with('people', ['search' => 'luke'])
            ->andReturn($expectedData);

        $response = $this->controller->people($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($expectedData, json_decode($response->getContent(), true));
    }

    public function test_planets_method_calls_service_with_correct_parameters()
    {
        $expectedData = ['results' => []];

        $request = Mockery::mock(PlanetsRequest::class);
        $request->shouldReceive('validated')
                ->once()
                ->andReturn(['name' => 'tatooine']);

        $this->mockService
            ->shouldReceive('fetchWithCache')
            ->once()
            ->with('planets', ['search' => 'tatooine'])
            ->andReturn($expectedData);

        $response = $this->controller->planets($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($expectedData, json_decode($response->getContent(), true));
    }

    public function test_films_method_calls_service_with_correct_parameters()
    {
        $expectedData = ['results' => []];

        $request = Mockery::mock(FilmsRequest::class);
        $request->shouldReceive('validated')
                ->once()
                ->andReturn(['name' => 'hope']);

        $this->mockService
            ->shouldReceive('fetchWithCache')
            ->once()
            ->with('films', ['search' => 'hope'])
            ->andReturn($expectedData);

        $response = $this->controller->films($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals($expectedData, json_decode($response->getContent(), true));
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
