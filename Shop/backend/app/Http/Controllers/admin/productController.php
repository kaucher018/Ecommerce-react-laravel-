<?php

namespace App\Http\Controllers\admin;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\TempImage;
use App\Models\ProductImage;
use App\Models\ProductSize;

class productController extends Controller
{
    function index(){
        $products = Product::orderBy('created_at', 'desc')->with(['product_images','product_sizes'])
        ->get();
        return response()->json([
            'status' => '200',
            'products'=> $products]);

    }
    function store(Request $request){
        $validator = validator($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'status' => 'required'  ,
            'sku' => 'required|unique:products,sku',
            'category_id' => 'required',
            // 'is_featured' => 'required'
            
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }
        $product = Product::create([
            'title' => $request->title,
            'status' => $request->status,
            'category_id' => $request->category_id,
            'is_featured' => $request->is_featured,
            'sku' => $request->sku,
            'price' => $request->price,
            'compare_price' => $request->compare_price,
            'description' => $request->description,
            'Short_description' => $request->Short_description,
            'brand_id' => $request->brand_id,
            'quantity' => $request->quantity,
            'barcode' => $request->barcode
        ]);

        //size

         if(!empty($request->size)){
    
    foreach($request->size as $sizeid){
        $productsize = New ProductSize();
        $productsize->product_id = $product->id;
        $productsize->size_id = $sizeid;
        $productsize->save();
        
    }
  }

        //store image by intervention image

        if(!empty($request->gallary)){
            foreach($request->gallary as $key => $tempId){
                $img = TempImage::find($tempId);


//image name with extension
                $extArray = explode('.',$img->name);
                $extension = end($extArray);
                $rand = rand(1000,9999);
                $imageName = $product->id.'-'.$rand.time().'.'.$extension;


                 //large img
                $manager = new ImageManager(new Driver());
                $imgLarge = $manager->read('uploads/temp/'.$img->name);
                $imgLarge->scaleDown(1200);
                $imgLarge->save(public_path('uploads/products/large/'.$imageName));


                //small img
                $imgSmall = $manager->read('uploads/temp/'.$img->name);
                $imgSmall->coverDown(400, 460);
                $imgSmall->save(public_path('uploads/products/small/'.$imageName));

                

                $productimg = ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $imageName
                ]);
                
               

                if($key == 0){
                    $product->image = $imageName;
                    $product->save();
                }
                
            }


            
        }
        return response()->json([
            'status' => '200',
            'message' => 'Product created successfully',
            'product' => $product]);
    }
  

function update(Request $request, $id){
    $validator = validator($request->all(), [
        'title' => 'required',
        'price' => 'required|numeric',
        'status' => 'required',
        'sku' => 'required',
        'category_id' => 'required',
        // 'is_featured' => 'required'
        
    ]);
    if($validator->fails()){
        return response()->json([
            'status' => 400,
            'errors' => $validator->errors()],400);
    }
    $product = Product::find($id);
    if(!$product){
        return response()->json([
            'status' => 404,
            'message' => 'Product not found'],404);
    }
    $product->update([
        'title' => $request->title,
        'status' => $request->status,
        'category_id' => $request->category_id,
        'is_featured' => $request->is_featured,
        'sku' => $request->sku,
        'price' => $request->price,
        'compare_price' => $request->compare_price,
        'description' => $request->description,
        'Short_description' => $request->Short_description,
        'brand_id' => $request->brand_id,
        'quantity' => $request->quantity,
        'barcode' => $request->barcode
    ]);

  if(!empty($request->size)){
    ProductSize::where('product_id',$product->id)->delete();
    foreach($request->size as $sizeid){
        $productsize = New ProductSize();
        $productsize->product_id = $product->id;
        $productsize->size_id = $sizeid;
        $productsize->save();
        
    }
  }

    //update image by intervention image

    if(!empty($request->gallary)){
        foreach($request->gallary as $key => $tempId){
            $img = TempImage::find($tempId);

            //image name with extension
            $extArray = explode('.',$img->name);
            $extension = end($extArray);
            $imageName = $product->id.'-'.time().'.'.$extension;

            //large img
            $manager = new ImageManager(new Driver());
            $imgLarge = $manager->read('uploads/temp/'.$img->name);
            $imgLarge->scaleDown(1200);
            $imgLarge->save(public_path('uploads/products/large/'.$imageName));

            //small img
            $imgSmall = $manager->read('uploads/temp/'.$img->name);
            $imgSmall->coverDown(400, 460);
            $imgSmall->save(public_path('uploads/products/small/'.$imageName));

            //delete old image
            if($key == 0){
                if($product->image){
                    unlink(public_path('uploads/products/large/'.$product->image));
                    unlink(public_path('uploads/products/small/'.$product->image));
                }
            }

            $productimg = ProductImage::updateOrCreate([
                'product_id' => $product->id,
                'image' => $imageName
            ]);

            if($key == 0){
                $product->image = $imageName;
                $product->save();
            }
        }
    }
      $productsizes = $product->product_sizes()->pluck('size_id');

    return response()->json([
        'status' => 200,
        'message' => 'Product updated successfully',
        'product' => $product,
       ]);
}

 function destroy($id){
    $product = Product::with(['product_images','product_sizes'])->find($id);
    $product->delete();

    if($product-> product_images()){
        foreach($product->product_images() as $productimage){
            File::delete(public_path('uploads/products/large/'.$productimage->image));
            File::delete(public_path('uploads/products/small/'.$productimage->image));
            
        }
        
    }
    
    return response()->json([
        'status' => '200',
        'message' => 'Product deleted successfully',
        'product' => $product]);
 }

 function show($id){
    $product = Product::with(['product_images','product_sizes'])->find($id);  

    if($product == null){
        return response()->json([
            'status' => '404',
            'message' => 'Product not found'
           ]);
    }
    $productsizes = $product->product_sizes()->pluck('size_id');
   
    return response()->json([
        'status' => '200',
        'product' => $product,
        'product_sizes' => $productsizes]);
 }



 function saveProductImage(Request $request){
    $validator = validator($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'  
            
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }

        $image = $request->file('image');
        $imageName = $request->product_id.'-'. time().'.'.$image->extension();

                 //large img
                $manager = new ImageManager(Driver::class);
                $imgLarge = $manager->read($image->getPathName());
                $imgLarge->scaleDown(1200);
                $imgLarge->save(public_path('uploads/products/large/'.$imageName));


                //small img
                 $manager = new ImageManager(Driver::class);
                $imgSmall = $manager->read($image->getPathName());
                $imgSmall->coverDown(400, 460);
                $imgSmall->save(public_path('uploads/products/small/'.$imageName));

         $productimage = new ProductImage();
        $productimage->image = $imageName;
        $productimage->product_id = $request->product_id;
        $productimage->save(); 

        return response()->json([
            'status' => '200',
            'message' => 'Image uploaded successfully',
            'data' => $productimage]);
     
 }
 function productdefaultimage(Request $request){
    $product = Product::find($request->product_id);
    $product->image = $request->image;
    $product->save();
    return response()->json([
        'status' => '200',
        'message' => 'set default Image uploaded successfully',
        'data' => $product]);

     
 }


 function deleteProductImage($id){
    $productimage = ProductImage::find($id);

if($productimage == null){
    return response()->json([
        'status' => '404',
        'message' => 'Image not found'
       ],404);
}

 File::delete(public_path('uploads/products/large/'.$productimage->image));
 File::delete(public_path('uploads/products/small/'.$productimage->image));

    $productimage->delete();
    return response()->json([
        'status' => '200',
        'message' => 'Image deleted successfully',
        ]);
     
 }
















}
