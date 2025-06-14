<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OderItem;   

class Oder extends Model
{
    public function oderItems(){
        return $this->hasMany(OderItem::class);
    }

    protected function casts():array{
        return[
            'created_at' => 'datetime:d M ,Y',
        ];
    }
}
