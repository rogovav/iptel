<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::delete('/phone/delete/{id}', 'PhoneController@delete');
Route::delete('/group/delete/{id}', 'GroupController@delete');
Route::delete('/building/delete/{id}', 'BuildingController@delete');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
