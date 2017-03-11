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
Route::get('/todos', function(){
  return response()->json([
    [ 'id' => str_random(5), 'todo' => 'blablabla', 'created_at' => '2017-03-09 11:00' ],
    [ 'id' => str_random(5), 'todo' => 'blablabla', 'created_at' => '2017-03-09 13:00' ],
  ]);
});

Route::post('/todos', function (Request $request) {
    return response()->json([
      'id' => str_random(5),
      'todo' => $request->input('todo'),
      'created_at' => date('Y-m-d H:i'),
    ]);
});

Route::get('/attractions', 'AttractionController@index');
Route::get('/hotels', 'HotelController@index');


