<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    public function phones()
    {
        return $this->hasMany('Phone');
    }

    protected $fillable = ['name', 'address', 'type'];
}
