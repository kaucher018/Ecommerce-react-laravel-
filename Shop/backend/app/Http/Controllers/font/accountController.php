<?php

namespace App\Http\Controllers\font;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Oder;

class accountController extends Controller
{
   function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
    
        ]);
        $token = $user->createToken('myapptoken')->plainTextToken;
        return response()->json([
            'status' => 201,
            'message' => 'User created successfully',
            'token' => $token,
            'userID' => $user->id,
            'name' => $user->name
        ],201);
    }

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
           

             $token = $user->createToken('myapptoken')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'message' => 'welcome our happy Customer',
                    'token' => $token,
                    'userID' => $user->id,
                    'name' => $user->name
                ],200);

        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Invalid email or password',
            ],400);
        }
    }

// public function logout(Request $request){
//     $request->user()->currentAccessToken()->delete();
//     return response()->json([
//         'status' => 200,
//         'message' => 'Logout successfully',
//     ],200);



public function getOderdetails($id, Request $request){
    $oders = Oder::where(['user_id'=> $request->user()->id,'id'=> $id])->with('oderitems')->first();
    if(empty($oders)){
        return response()->json([
            'status' => '400', 
            'message' => 'Oder not found',
        ]);
    }
    return response()->json([
        'status' => '200', 
        'data' => $oders,
    ]);
}





}
