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
            Building::find($request['id'])->update([
                'name' => $request['name'],
                'address' => $request['address']
            ]);
        } else {
            Building::create([
                'name' => $request['name'],
                'address' => $request['address']
            ]);
        }
        return json_encode('success');
    }

    public function delete(Request $request)
    {
        Building::find($request['id'])->delete();
        return json_encode('success');
    }

    public function get(Request $request)
    {
        return Building::find($request['id'])->toJson();
    }
}
