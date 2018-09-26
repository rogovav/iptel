<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Phone;

class PhoneController extends Controller
{
    public function index()
    {
        $phones = Phone::all();
        return $this->return_data($phones);
    }

    public function add(Request $request)
    {
        $phone = Phone::create([
            'fio' => $request['fio'],
            'position' => $request['position'],
            'phone' => $request['phone'],
            'ip_phone' => $request['ip_phone'],
            'building_id' => $request['building_id'],
            'group_id' => $request['group_id'],
            'room' => $request['room'],
            'room_type' => $request['room_type']
        ]);
//        return $phone->toJson();
        return $this->return_data($phone);
    }

    public function return_data($phones)
    {
        $data = [];

        foreach ($phones as $phone)
        {
            $building = $phone->building;
            $data[] = [
                'id' => $phone->id,
                'fio' => $phone->fio,
                'position' => $phone->position,
                'phone' => $phone->phone,
                'ip_phone' => $phone->ip_phone,
                'building' => $building->name . ", " . $phone->room . " " . $phone->room_type,
                'address' => $building->address,
                'group' => $phone->group->name,
            ];
        }

        return json_encode($data);
    }
}
