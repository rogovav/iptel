<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Phone;

class PhoneController extends Controller
{
    public function index()
    {
        $phones = Phone::all();
        return $phones->toJson();
    }

    public function add(Request $request)
    {
        Phone::create([
            'fio' => $request['fio'],
            'position' => $request['position'],
            'phone' => $request['phone'],
            'ip_phone' => $request['ip_phone'],
            'building_id' => $request['building_id'],
            'group_id' => $request['group_id'],
            'room' => $request['room'],
            'room_type' => $request['room_type']
        ]);
        return json_encode('success');
    }
}
