<?php

namespace App;

use App\AppCamareiras; 
use App\AppQuartos;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AppManutencao extends Model
{
    protected $table = 'app_manutencao';
    static function getAll(){
        $result = array();
                
        $query = AppManutencao::orderBy('descricao','asc')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['description'] = $item->descricao;
            $i++;
        }
        return $result;
    }

    static function getByAtividade($id){
        $result = array();
                
        $query = AppManutencao::where('atividade_id',$id)->get();
        if($query->count() > 0){
            foreach($query as $item){
                $result['id'] = $item->id;
                $result['description'] = $item->descricao;
            }
        }else{
            $result = null;
        }
        return $result;
    }
}
