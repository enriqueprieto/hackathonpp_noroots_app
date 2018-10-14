<?php

namespace App;

use App\AppCamareiras; 
use App\AppQuartos;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AppLavanderia extends Model
{
    static function getAll(){
        $result = array();
                
        $query = DB::table('app_lavanderia as l')
            ->join('app_camareiras as c', 'c.id', '=', 'l.camareira_id')
            ->join('app_quartos as q', 'q.id', '=', 'l.quarto_id')
            ->select('l.id as id', 'c.id as camareira_id','c.nome as camareira'
            ,'q.numero as numero', 'q.andar as andar')->get();
        $i = 0;
    
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['camareira_id'] = $item->camareira_id;
            $result[$i]['camareira'] = $item->camareira;
            $result[$i]['number'] = $item->numero;
            $result[$i]['floor'] = $item->andar;
            $result[$i]['description'] = $item->descricao;
        }
        return $result;
    }
}
