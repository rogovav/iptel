<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Building;

class BuildingController extends Controller
{
    public function index()
    {
        $buildings = Building::all('id', 'name', 'address');

        return $buildings->toJson();
    }

    public function add(Request $request)
    {
        $building = Building::create([
            'name' => $request['name'],
            'address' => $request['address']
        ]);

        return $building->toJson();
    }
}
