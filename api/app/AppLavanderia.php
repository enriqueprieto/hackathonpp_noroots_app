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
                
        $query = AppLavanderia::orderBy('descricao','asc')->get();
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
                
        $query = AppLavanderia::where('atividade_id',$id)->get();
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
