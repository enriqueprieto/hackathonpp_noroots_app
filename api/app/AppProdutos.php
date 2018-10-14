<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppProdutos extends Model
{
    static function getAll(){
        $result = array();

        $query = AppProdutos::orderBy('nome','asc')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['name'] = $item->nome;
            $i++;
        }
        return $result;
    }
}
