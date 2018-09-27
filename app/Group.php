<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function phones()
    {
        return $this->hasMany('App\hone');
    }

    protected $fillable = ['name', 'parent_id', 'priority'];
}
