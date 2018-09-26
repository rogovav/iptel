<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Phone;

class PhoneController extends Controller
{
    public function index()
    {
        $data = [];
        $phones = Phone::all();
        foreach ($phones as $phone)
        {
            $data[] = [
                'fio' => $phone->fio,
                'position' => $phone->position,
                'phone' => $phone->phone,
                'ip_phone' => $phone->ip_phone,
                'building' => $phone->building->name,
                'group' => $phone->group->name,
            ];
        }
        return json_encode($data);
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
