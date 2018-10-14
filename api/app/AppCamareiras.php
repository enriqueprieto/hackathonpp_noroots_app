<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppCamareiras extends Model
{
    static function getAll(){
        $query = AppCamareiras::orderBy('nome','asc')->get();
            $i = 0;
            $camareira = array();
            foreach($query as $item){
                $camareira[$i]['id'] = $item->id;
                $camareira[$i]['name'] = $item->nome;
                $camareira[$i]['period'] = $item->turno;
                $i++;
            }
        return $camareira;
    }
}
