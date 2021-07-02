<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    public function store(Request $request){
    
            //リクエストデータの取得
            $favoriteData = $request->all();
            Favorite::create([
                    'user_id' =>$favoriteData['user_id'],
                    'subject_id' =>$favoriteData['subject_id']
                ]);
    }

    public function delete(Request $request){
    
        //リクエストデータの取得
        $getFavorite = $request->all();
        $favorite_id = $getFavorite['favorite_id'];
        \DB::table('favorites')->where("favorite_id",$favorite_id)->delete();
    }


}
