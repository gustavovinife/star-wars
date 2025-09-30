<?php

namespace App\Http\Controllers;

use App\Http\Requests\PeopleRequest;
use App\Http\Requests\PlanetsRequest;
use App\Http\Requests\FilmsRequest;
use App\Services\SwapiService;

class SwapiController extends Controller
{
    protected SwapiService $swapi;

    public function __construct(SwapiService $swapi)
    {
        $this->swapi = $swapi;
    }

    public function people(PeopleRequest $request)
    {
        $name = $request->validated()['name'];
        $data = $this->swapi->fetchWithCache('people', ['search' => $name]);

        return response()->json($data);
    }

    public function planets(PlanetsRequest $request){
        $name = $request->validated()['name'];
        $data = $this->swapi->fetchWithCache('planets', ['search' => $name]);

        return response()->json($data);
    }

    public function films(FilmsRequest $request){
        $name = $request->validated()['name'];
        $data = $this->swapi->fetchWithCache('films', ['search' => $name]);

        return response()->json($data);
    }

    public function singlePerson(string $id)
    {
        $data = $this->swapi->fetchWithCache('people/' . $id, []);

        if (!$data) {
            return response()->json(['error' => 'Person not found'], 404);
        }

        return response()->json($data);
    }

    public function singleFilm(string $id)
    {
        $data = $this->swapi->fetchWithCache('films/' . $id, []);

        if (!$data) {
            return response()->json(['error' => 'Film not found'], 404);
        }

        return response()->json($data);
    }
}
