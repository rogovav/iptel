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
        if ($request['id']) {
            $building = Building::find($request['id']);
            $building->name = $request['name'];
            $building->address = $request['address'];
            $building->save();
        } else {
            $building = Building::create([
                'name' => $request['name'],
                'address' => $request['address']
            ]);
        }
        return $building->toJson();
    }

    public function delete(Request $request)
    {
        Building::find($request['id'])->delete();
        return json_encode('success');
    }

    public function update(Request $request)
    {
        $building = Building::find($request['id']);
        $building->name = $request['name'];
        $building->address = $request['address'];
        $building->save();
        return json_encode('success');
    }

    public function get(Request $request)
    {
        return Building::find($request['id'])->toJson();
    }
}
