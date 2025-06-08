<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categories;

class categoriesController extends Controller
{
    function index(){
        $categories = Categories::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => '200',
            'categories'=> $categories]);
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

        $category = Categories::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);
        return response()->json([
            'status' => '200',
            'message' => 'Category created successfully',
            'category' => $category]);
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
        $category = Categories::find($id);
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();
        return response()->json([
            'status' => '200',
            'message' => 'Category updated successfully',
            'category' => $category]);
    }

    function destroy($id){
        $cats = Categories::find($id);
        $cats->delete();
        
        return response()->json([
            'status' => '200',
            'message' => 'Category deleted successfully',
            'category' => $cats]);
    }
    function show($id){
        $cats = Categories::find($id);

        if($cats == null){
            return response()->json([
                'status' => '404',
                'message' => 'Category not found'
               ]);
        }
       
        return response()->json([
            'status' => '200',
            'category' => $cats]);
}
}

