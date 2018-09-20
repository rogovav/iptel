<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function parent()
    {
        return $this->belongsTo('Group', 'parent');
    }

    public function child()
    {
        return $this->hasMany('Group', 'parent');
    }
}
