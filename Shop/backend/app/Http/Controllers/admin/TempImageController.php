<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempImage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;




class TempImageController extends Controller
{
    function store(Request $request){
        $validator = validator($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'  
            
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()],400);
        }

        $tempimage = new TempImage();
        $tempimage->name = 'dummy name';
        $tempimage->save();

        $image = $request->file('image');
        $imageName = time().'.'.$image->extension();
        $image->move(public_path('uploads/temp'),$imageName);

        $tempimage->name =  $imageName;
        $tempimage->save();

$manager = new ImageManager(new Driver());
$img = $manager->read('uploads/temp/'.$imageName);
$img->coverDown(1200, 720);
$img->save(public_path('uploads/temp/thumb/'.$imageName));


        return response()->json([
            'status' => '200',
            'message' => 'Image uploaded successfully',
            'data' => $tempimage]);
    }



function destroy($id){

  
    $tempimage = TempImage::find($id);
    if($tempimage == null){
        return response()->json([
            'status' => '404',
            'message' => 'Image not found'
           ],404);
    }
    File::delete(public_path('uploads/temp/'.$tempimage->name));
    // File::delete(public_path('uploads/temp/thumb/'.$tempimage->name));
    $tempimage->delete();
    return response()->json([
        'status' => '200',
        'message' => 'Image deleted successfully',
        'data' => $tempimage]);
}








}




