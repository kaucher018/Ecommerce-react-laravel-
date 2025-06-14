<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Size;

class ProductSize extends Model
{
    public function size()
{
    return $this->belongsTo(Size::class, 'size_id');
}

}
