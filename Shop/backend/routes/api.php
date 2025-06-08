<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\authController;
use App\Http\Controllers\admin\categoriesController;
use App\Http\Controllers\admin\brandsController;
use App\Http\Controllers\admin\sizeController;
use App\Http\Controllers\admin\productController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\font\productController as fontProductController;



Route::post('/login', [authController::class,'authenticate']);
Route::post('/register', [authController::class,'register']);
Route::get('/showproducts', [fontProductController::class,'showproducts']);
Route::get('/bestproducts', [fontProductController::class,'bestproducts']);
Route::get('/getcategories', [fontProductController::class,'getcategories']);
Route::get('/getbrands', [fontProductController::class,'getbrands']);
Route::get('/getproduct', [fontProductController::class,'getproduct']);
Route::get('/getproductdetail/{id}', [fontProductController::class,'getproductdetail']);



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['middleware' => 'auth:sanctum'], function () {
    // Route::get('/categories', [categoriesController::class,'index']);
    // Route::post('/categories', [categoriesController::class,'store']);
    // Route::put('/categories/{id}', [categoriesController::class,'update']);
    // Route::delete('/categories/{id}', [categoriesController::class,'delete']);
    // Route::get('/categories/{id}', [categoriesController::class,'show']);

    Route::resource('categories', categoriesController::class);// can reduse code writing || check route list is terminal : php artisan route:list
    Route::resource('brands', brandsController::class);
    Route::get('/sizes', [sizeController::class,'index']);
    Route::resource('products', productController::class);
    
    
    Route::post('saveproductimage', [productController::class,'saveProductImage']);
    Route::post('temp', [TempImageController::class,'store']);
    Route::delete('temp/{id}',[TempImageController::class,'destroy']);


    Route::GET('setproductdefaultimage', [productController::class,'productdefaultimage']);
    Route::delete('deleteproductimage/{id}', [productController::class,'deleteProductImage']);
   
});
