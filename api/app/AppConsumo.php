<?php

namespace App;

use App\AppCamareiras; 
use App\AppQuartos;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AppConsumo extends Model
{
    protected $table = 'app_consumo';
    static function getAll(){
        $result = array();
        $query = DB::table('app_consumo as c')
                ->join('app_itens_consumo as ic', 'ic.consumo_id', '=', 'c.id')
                ->join('app_produtos as p', 'ic.produto_id', '=', 'p.id')
                
                ->select('p.id as id','p.nome as nome','ic.qtde as qtde')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['name'] = $item->nome;
            $result[$i]['count'] = $item->qtde;
            $i++;
        }
        return $result;
    }

    static function getByAtividade($id){
        $result = array();
        $query = DB::table('app_consumo as c')
                ->join('app_itens_consumo as ic', 'ic.consumo_id', '=', 'c.id')
                ->join('app_produtos as p', 'ic.produto_id', '=', 'p.id')
                ->where('atividade_id',$id)
                ->select('p.id as id','p.nome as nome','ic.qtde as qtde')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['name'] = $item->nome;
            $result[$i]['count'] = $item->qtde;
            $i++;
        }
        
        return $result;
    }
}
