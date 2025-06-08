<?php

namespace App\Http\Controllers\font;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Categories;
use App\Models\Brands;

class productController extends Controller
{
    function showproducts(){
        $products = Product::orderBy('created_at', 'desc')->limit(10)
        ->get();
        return response()->json([
            'status' => '200',
            'products'=> $products]);
    }

    function bestproducts(){
        $products = Product::orderBy('created_at', 'desc')->limit(5)->where('is_featured',1)
        ->get();
        return response()->json([
            'status' => '200',
            'products'=> $products]);
    }

    function getcategories(){
        $categorires = Categories::orderBy('created_at','ASC')
        ->where('status',1)->get();
        return response()->json([
            'status' => '200',
            'data'=> $categorires]);
    }

     function getbrands(){
        $brands = Brands::orderBy('created_at','ASC')
        ->where('status',1)->get();
        return response()->json([
            'status' => '200',
            'data'=> $brands]);
    }

    function getproduct(Request $request){
        $product = Product::orderBy('created_at', 'desc')->where('status',1);

        if(!empty($request->category)){
            $catarray = explode(',', $request->category);
            $product = $product->whereIn('category_id', $catarray);
        }

        if (!empty($request->brand)){
            $brandarray = explode(',',$request->brand);
            $product = $product->whereIn('brand_id',$brandarray);
        }
        $product = $product->get();
        return response()->json([
            'status' => '200',
            'data'=> $product]);
    }

    function getproductdetail($id){
        $product = Product::with('product_images','product_sizes.size')->find($id);

        if($product == null){
            return response()->json([
                'status' => '404',
                'message' => 'Product not found'
               ]);
        }
        return response()->json([
            'status' => '200',
            'data'=> $product]);
    }
}
