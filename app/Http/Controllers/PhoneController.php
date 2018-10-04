<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Phone;
use \App\Group;
use Illuminate\Support\Facades\Log;

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

    public function return_data($phone)
    {
        $building = $phone->building;
        return [
            'id' => $phone->id,
            'fio' => $phone->fio,
            'position' => $phone->position,
            'phone' => $phone->phone,
            'email' => $phone->email,
            'ip_phone' => $phone->ip_phone,
            'building' => $building->name . ", " . $phone->room . " " . $phone->room_type,
            'address' => $building->address,
            'group' => $phone->group->name,
        ];
    }

    public function add(Request $request)
    {
        $data = [
            'fio' => $request['fio'],
            'position' => $request['position'],
            'phone' => implode(", ", $request['phone']? $request['phone'] : []),
            'email' => $request['email'],
            'ip_phone' => implode(", ", $request['ip_phone']? $request['ip_phone'] : []),
            'building_id' => $request['building_id'],
            'group_id' => $request['group_id'],
            'room' => $request['room'],
            'room_type' => $request['room_type']
        ];
        if ($request['id']) {
            Phone::find($request['id'])->update($data);
        } else {
            Phone::create($data);
        }
        return json_encode('success');
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
        $group_phones_info = "";
        $group_emails_info = "";
        if ($group->phone) {
            $group_phones = explode(",", $group->phone);
            $tel = "";
            $fax = "";
            foreach ($group_phones as $phone)
            {
                $phone_array = explode(":", $phone);
                if (trim($phone_array[0]) == 'Телефон') {
                    $number = str_replace("-", "", trim($phone_array[1]));
                    $tel .=  $tel? ", " : "";
                    $tel .= "<a href=\"tel:$number\">$number</a>";
                } elseif (trim($phone_array[0]) == 'Факс') {
                    $number = str_replace("-", "", trim($phone_array[1]));
                    $fax .=  $fax? ", " : "";
                    $fax .= "<a href=\"fax:$number\">$number</a>";
                }
            }
            $group_phones_info .= $tel? 'Телефон: ' . $tel : "";
            $group_phones_info .= $fax? ' Факс: ' . $fax : "";
            Log::debug($group_phones_info);
        }
        if ($group->email) {
            $group_emails = explode(",", $group->email);
            foreach ($group_emails as $email)
            {
                $group_emails_info .= $group_emails_info? ", " : "";
                $group_emails_info .= "<a href=\"mailto:$email\">$email</a>";
            }
        }

        $group_emails_info = $group_emails_info? "Email: $group_emails_info" : "";
        $group_info = "$group->name <p>$group_phones_info $group_emails_info</p>";
        $phones = $group->phones;
        $data = [];
        if ($phones->count() > 0) {
            foreach ($phones as $phone) {
                $building = $phone->building;
                $data[] = [
                    'name' => $phone->fio,
                    'phone' => $phone->phone,
                    'ip_phone' => $phone->ip_phone,
                    'email' => $phone->email,
                    'position' => $phone->position,
                    'building' => $building->name . ", " . $phone->room . " " . $phone->room_type,
                    'address' => $building->address,
                ];
            }
            return [$group_info => array_merge($data, $child)];
        } else {
            return [
                $group_info => $child
            ];
        }
    }

    public function delete(Request $request)
    {
        Phone::find($request['id'])->delete();
        return json_encode('success');
    }

    public function get(Request $request)
    {
        return Phone::find($request['id'])->toJson();
    }
}
