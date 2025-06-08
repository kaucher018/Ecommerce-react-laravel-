<?php

namespace App\Http\Controllers\admin;
use App\Models\Size;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class sizeController extends Controller
{ 
    
    public function index(){

     $sizes = Size::orderBy('id', 'ASC')->get();
    return response()->json([
        'status' => '200',
        'sizes'=> $sizes
    ],200);
}

}
