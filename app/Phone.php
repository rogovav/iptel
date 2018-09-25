<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    public function building()
    {
        return $this->belongsTo('Building');
    }

    public function group()
    {
        return $this->belongsTo('Group');
    }
}
