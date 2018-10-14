<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppQuartos extends Model
{
    static function getAll(){
        $result = array();
        $query = AppQuartos::orderBy('numero','asc')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['number'] = $item->numero;
            $result[$i]['floor'] = $item->andar;
            $result[$i]['single_bed'] = $item->cama_solteiro;
            $result[$i]['double_bed'] = $item->cama_casal;
            $result[$i]['bathtub'] = $item->banheira;
            $i++;
        }
        return $result;
    }
}
