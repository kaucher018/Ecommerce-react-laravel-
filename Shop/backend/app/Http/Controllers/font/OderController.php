<?php

namespace App\Http\Controllers\font;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Oder;
use App\Models\OderItem;

class OderController extends Controller
{
    
    public function saveOrder(Request $request){

if(!empty(request('cart'))){
        
   

        $oder = new Oder();
        $oder->user_id = $request->user()->id;
        $oder->subtotal = $request->subtotal;
        $oder->grand_total = $request->grand_total;
        $oder->shipping = $request->shipping;
        $oder->discount = $request->discount;
        $oder->payment_status = $request->payment_status;
        $oder->status = $request->status;
        $oder->name = $request->name;
        $oder->email = $request->email;
        $oder->mobile = $request->mobile;
        $oder->address = $request->address;
        $oder->city = $request->city;
        $oder->zip = $request->zip;
        $oder->save();
       
        foreach($request->cart as $item){
            $orderItem = new OderItem();
            $orderItem->oder_id = $oder->id;
            $orderItem->product_id = $item['product_id'];
            $orderItem->size = $item['size'];
            $orderItem->name = $item['title'];
            $orderItem->price = $item['quantity'] * $item['price'];
            $orderItem->unit_price = $item['price'];
            $orderItem->quantity = $item['quantity'];
            $orderItem->save();

        }

        return response()->json([
            'id' => $oder->id,
            'status' => '200', 
            'message' => 'You successfully placed an order',

        ]);
 }else{

    return response()->json([
            
        'status' => '400', 
        'message' => 'Your cart is empty',
    
    ]);
 }



    } 

    function index(){
        $oders = Oder::where('user_id', auth()->user()->id)->get();
        return response()->json([
            'status' => '200', 
            'oders' => $oders,
        ]);
    }
}
