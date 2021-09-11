<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::MAIN;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectPath()
    {
        return 'main#/home';
        //ログイン後のURLの指定
    }

    //ゲストログイン
    public function guestLogin()
    {
    $email = 'aaa@example.com';
    $password = 'password';
    if (Auth::attempt(['email' => $email, 'password' => $password])) {
        return redirect('main#/home')->with('flash_message', 'ゲストログインしました');
    }
    else{
        return redirect('/');
    }
    }
}