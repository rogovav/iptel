<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    public function phones()
    {
        return $this->hasMany('App\Phone');
    }

    protected $fillable = ['name', 'address', 'type'];
}
