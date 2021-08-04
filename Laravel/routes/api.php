<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login','EmployeeController@Login');

Route::get('/allEmployee','EmployeeController@AllEmployee');
Route::get('/search/{keyword}','EmployeeController@SearchEmployee');
Route::post('/createEmp','EmployeeController@CreateEmployee');
Route::post('/deleteEmp','EmployeeController@DeleteEmployee');
Route::post('/editEmp','EmployeeController@EditEmployee');

Route::get('/jobs','JobController@AllJob');
Route::post('/jobs','JobController@CreateNewJob');
Route::post('/updateJobs','JobController@UpdateJob');
Route::post('/deleteJobs','JobController@DeleteJob');
