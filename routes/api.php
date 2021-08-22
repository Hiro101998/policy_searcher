<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\user;
use App\Models\university;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\FavoriteController;


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

//UniversitySearch .vueに送る用
Route::get('/universitySearch',function (Request $request) {
	
    $universities = \DB::table('universities')->join('departments','universities.university_id','=','departments.university_id')->join('subjects','departments.department_id','=','subjects.department_id')
    ->join('majors','subjects.subject_id','=','majors.subject_id')->where('universities.is_deleted',0)->where('departments.is_deleted',0)->where('subjects.is_deleted',0)->get();

	 
	$prefectures = \DB::table('prefectures')->get();
	$fields = \DB::table('fields')->get();
	$operators = \DB::table('operators')->get();
	$regions = \DB::table('regions')->get();

	return response()->json(['universities' => $universities,'regions' => $regions,'prefectures' => $prefectures,'fields' => $fields,'operators' => $operators]);
	
});

Route::get('/searchResult',function (Request $request) {
	$policies = \DB::table('policies')->get();
	$favorites = \DB::table('favorites')->get();
	
	return response()->json(['policies' => $policies,'favorites'=>$favorites]);
});

//お気に入りに追加
Route::post('/store',[App\Http\Controllers\FavoriteController::class,'store'])->name('store');
//お気に入り削除
Route::post('/delete',[App\Http\Controllers\FavoriteController::class,'delete'])->name('delete');

//favoriteにお気に入りに追加しているデータを送る。
Route::get('/favorite/{id}',function ($id) {
	//必要なデータをfavorite.vueに送る
	$favorites = \DB::table('universities')->join('departments','universities.university_id','=','departments.university_id')->join('subjects','departments.department_id','=','subjects.department_id')
	->join('policies','subjects.subject_id','=','policies.subject_id')->join('favorites','policies.subject_id','=','favorites.subject_id')
	->Where('favorites.user_id',$id)->where('universities.is_deleted',0)->where('departments.is_deleted',0)->where('subjects.is_deleted',0)
	->get();

	return response()->json(['favorites' => $favorites]);
	});

