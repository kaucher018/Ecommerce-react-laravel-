<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $fillable = [
        'name', 'status'// add this line
        // other fillable attributes...
    ];
}
