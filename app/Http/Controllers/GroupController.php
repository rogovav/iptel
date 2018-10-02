<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Group;
use Illuminate\Support\Facades\Log;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::all('id', 'name', 'parent_id', 'level', 'phone', 'email');
        $data = $this->add_to_data_req($groups);
        return $groups->toJson();
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
        return [
            'parent_id' => $group->parent_id,
            'value' => $group->id,
            'name' => $group->name,
            'level' => $group->level,
            'phone' => $group->phone,
            'email' => $group->email,
            'child' => $child
        ];
    }

    public function add(Request $request)
    {
        $group = Group::create([
            'name' => $request['name'],
            'parent_id' => $request['parent_id'],
            'level' => ($request['parent_id'] ? Group::find($request['parent_id'])->level + 1 : 0),
            'priority' => $request['priority'],
            'phone' => implode(", ", $request['phone']),
            'email' => implode(", ", $request['email']),
        ]);

        return $group->toJson();
    }

    public function delete(Request $request){
        Group::find($request['id'])->delete();
        return json_encode('success');
    }
}
