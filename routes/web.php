<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin-panel', function () {
    return view('admin');
})->middleware("auth");

Route::get('/buildings', 'BuildingController@index');
Route::post('/building/add', 'BuildingController@add');
Route::get('/building/{id}', 'BuildingController@get');
Route::post('/building/{id}', 'BuildingController@update');

Route::get('/groups', 'GroupController@index');
Route::post('/group/add', 'GroupController@add');

Route::get('/phones', 'PhoneController@index');
Route::post('/phone/add', 'PhoneController@add');
Route::get('/phones/all', 'PhoneController@get_all');
Route::delete('/phone/delete/{id}', 'PhoneController@delete');

Auth::routes();
