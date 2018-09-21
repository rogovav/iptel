<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Group;
use Illuminate\Support\Facades\Log;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::all('id', 'name', 'parent_id', 'level');
        $data = $this->add_to_data_req($groups);
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
        return [
            'parent_id' => $group->parent_id,
            'value' => $group->id,
            'name' => $group->name,
            'level' => $group->level,
            'child' => $child
        ];
    }

    public function add(Request $request)
    {
        Group::create([
            'name' => $request['name'],
            'parent_id' => $request['parent_id'],
            'priority' => $request['priority'],
        ]);

        return back()->withInput();
    }
}
