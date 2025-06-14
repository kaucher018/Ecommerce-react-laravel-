<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class authController extends Controller
{
    public function authenticate(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = User::find(Auth::user()->id);
            if($user->role == 'admin'){

             $token = $user->createToken('myapptoken')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'message' => 'welcome admin',
                    'token' => $token,
                    'userID' => $user->id,
                    'name' => $user->name
                ],200);
            }if($user->role == 'customer'){
                $token = $user->createToken('myapptoken')->plainTextToken;
                return response()->json([
                    'status' => 201,
                    'message' => 'Welcome our happy customer',
                    'token' => $token,
                    'userID' => $user->id,
                    'name' => $user->name
                ],201);
            }


        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Invalid email or password',
            ],400);
        }
    }




   

   
}
