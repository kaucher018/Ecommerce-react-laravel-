<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brands;

class brandsController extends Controller
{
    function index(){
        $brands = Brands::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => '200',
            'brands'=> $brands]);
    }

    function store(Request $request){
        $validator = validator($request->all(), [
            'name' => 'required'   
            
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }

        $brands = Brands::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);
        return response()->json([
            'status' => '200',
            'message' => 'brands created successfully',
            'brands' => $brands]);
    }

    function update($id,Request $request){
        $validator = validator($request->all(), [
            'name' => 'required'   
            
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }
        $brands = Brands::find($id);
        if ($brands === null) {
            return response()->json(['error' => 'Brand not found'], 404);
        }
        $brands->name = $request->name;
        $brands->status = $request->status;
        $brands->save();
        return response()->json([
            'status' => '200',
            'message' => 'brands updated successfully',
            'brands' => $brands]);
    }



    function destroy($id){
        $brands = Brands::find($id);
        $brands->delete();
        
        return response()->json([
            'status' => '200',
            'message' => 'brands deleted successfully',
            'brands' => $brands]);
    }
    function show($id){
        $brands = Brands::find($id);

        if($brands == null){
            return response()->json([
                'status' => '404',
                'message' => 'brands not found'
               ]);
        }
       
        return response()->json([
            'status' => '200',
            'brands' => $brands]);
}
}
