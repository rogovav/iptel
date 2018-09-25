<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Building;

class BuildingController extends Controller
{
    public function index()
    {
        $buildings = Building::all('id', 'name', 'address', 'type');

        return $buildings->toJson();
    }

    public function add(Request $request)
    {
        Building::create([
            'name' => $request['name'],
            'address' => $request['address'],
            'type' => $request['type'],
        ]);

        return back()->withInput();
    }
}
