<?php

namespace App;

use App\AppCamareiras; 
use App\AppQuartos;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AppConsumo extends Model
{
    static function getAll(){
        $result = array();
        $query = DB::table('app_consumo as c')
                ->join('app_camareiras as c2', 'c2.id', '=', 'c.camareira_id')
                ->join('app_quartos as q', 'q.id', '=', 'c.quarto_id')
                ->select('c.id as id', 'c2.id as camareira_id','c2.nome as camareira'
                , 'q.numero as numero', 'q.andar as andar')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['camareira_id'] = $item->camareira_id;
            $result[$i]['camareira'] = $item->camareira;
            $result[$i]['number'] = $item->numero;
            $result[$i]['floor'] = $item->andar;
        }
        return $result;
    }
}
