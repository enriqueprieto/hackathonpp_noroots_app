<?php

namespace App;

use App\AppCamareiras; 
use App\AppQuartos;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AppLavanderia extends Model
{
    protected $table = 'app_lavanderia';
    static function getAll(){
        $result = array();
                
        $query = DB::table('app_lavanderia as l')
            ->join('app_camareira_quartos as cq', 'cq.id', '=', 'l.atividade_id')
            ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
            ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
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

    static function getByAtividade($id){
        $result = array();
                
        $query = AppLavanderia::where('atividade_id',$id);

        foreach($query as $item){
            $result['id'] = $item->id;
            $result['description'] = $item->descricao;
        }
        return $result;
    }
}
