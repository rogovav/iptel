<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Phone;
use \App\Group;

class PhoneController extends Controller
{
    public function index()
    {
        $data = [];
        $phones = Phone::all();
        foreach ($phones as $phone) {
            $data[] = $this->return_data($phone);
        }
        return json_encode($data);
    }

    public function add(Request $request)
    {
        $phone = Phone::create([
            'fio' => $request['fio'],
            'position' => $request['position'],
            'phone' => implode(", ", $request['phone']),
            'ip_phone' => implode(", ", $request['ip_phone']),
            'building_id' => $request['building_id'],
            'group_id' => $request['group_id'],
            'room' => $request['room'],
            'room_type' => $request['room_type']
        ]);
        $data[] = $this->return_data($phone);
        return json_encode($data);
    }

    public function return_data($phone)
    {
        $building = $phone->building;
        return [
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

    public function get_all()
    {
        $groups = Group::all();
        $data = ['data' => $this->add_to_data_req($groups)];
        return json_encode($data);
    }

    public function add_to_data_req($groups, $level = 0)
    {
        $data = [];
        foreach ($groups as $group) {
            if ($group->level == $level) {
                if ($group->children->count() > 0) {
                    $data[] = $this->add_to_data($group, $this->add_to_data_req($group->children, $level + 1));
                } else {
                    $data[] = $this->add_to_data($group);
                }
            }
        }
        return $data;
    }

    public function add_to_data($group, $child = [])
    {
        $phones = $group->phones;
        $data = [];
        if ($phones->count() > 0) {
            foreach ($phones as $phone) {
                $building = $phone->building;
                $data[] = [
                    'name' => $phone->fio,
                    'phone' => $phone->phone,
                    'ip_phone' => $phone->ip_phone,
                    'position' => $phone->position,
                    'building' => $building->name . ", " . $phone->room . " " . $phone->room_type,
                    'address' => $building->address,
                ];
            }
            return [$group->name => array_merge($data, $child)];
        } else {
            return [
                $group->name => $child
            ];
        }
    }

    public function delete(Request $request)
    {
        Phone::find($request['id'])->delete();
        return json_encode('success');
    }
}
