<?php

namespace App;

use App\AppCamareiraQuartos;
use App\AppCamareiras; 
use App\AppQuartos;
use App\AppStatus;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class AppServicos extends Model
{
    static function getAll(){
        $result = array();

        $query = DB::table('app_camareira_quartos as cq')
            ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
            ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
            ->join('app_status as s', 's.id', '=', 'cq.status_id')
            ->join('app_servicos as s2', 's2.id', '=', 'cq.servico_id')
            ->select('cq.id as id','c.nome as camareira','q.numero as numero',
            'q.andar as andar','s.status as status','s2.tipo as servico',
            'q.cama_solteiro as cama_solteiro', 'q.cama_casal as cama_casal','q.banheira as banheira')
            ->get();

        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['camareira'] = $item->camareira;
            $result[$i]['number'] = $item->numero;
            $result[$i]['floor'] = $item->andar;
            $result[$i]['room']['status'] = $item->status;
            $result[$i]['room']['service'] = $item->servico;
            $result[$i]['room']['single_bed'] = $item->cama_solteiro;
            $result[$i]['room']['double_bed'] = $item->cama_casal;
            $result[$i]['room']['bathtub'] = $item->banheira;
            $i++;
        }
        return $result;
    }
    
}
