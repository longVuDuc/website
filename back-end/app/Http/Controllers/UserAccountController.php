<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserAccountController extends Controller
{
    function register(request $request)
    {
        $user = new User;
        $user->name = $request->input("name");
        $user->email = $request->input("email");
        $user->password = Hash::make($request->input("password"));
        $user->save();  
        return $user;
    }
    function login(request $request)
    {
        $user = User::where("email", $request->input("email"))->first();
        if (!$user ||  !Hash::check($request->input("password"), $user->password)) {
            return ["error" => "Email or password is not matched"];
        }
        return $user;

        
    }
}
