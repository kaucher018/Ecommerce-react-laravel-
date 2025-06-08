<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'product_id',
        'image',
    ];
      protected $appends = ['image_url'];

    function getImageUrlAttribute(){
        if($this->image == ""){
            return "";
        }
        return asset('uploads/products/small/'.$this->image);
    }
}
