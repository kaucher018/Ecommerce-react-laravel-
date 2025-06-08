<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductImage;
use App\Models\ProductSize;

class Product extends Model
{

    protected $fillable = [
        'title',
        'status',
        'category_id',
        'is_featured',
        'sku',
        'price',
        'compare_price',
        'description',
        'Short_description',
        'image',
        'brand_id',
        'quantity',
        'barcode'
    ];

    protected $appends = ['image_url'];

    function getImageUrlAttribute(){
        if($this->image == ""){
            return "";
        }
        return asset('uploads/products/small/'.$this->image);
    }
    function product_images(){
        return $this ->hasMany(ProductImage::class);
    }
    function product_sizes(){
        return $this ->hasMany(ProductSize::class);
    }
 }
