<?php

use Illuminate\Http\Request;

Route::get('/buildings', 'BuildingController@index');
Route::post('/building/add', 'BuildingController@add');

Route::get('/groups', 'GroupController@index');
Route::post('/group/add', 'GroupController@add');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
