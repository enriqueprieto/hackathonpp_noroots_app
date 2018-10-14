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
    static function getAll(){//Atividades a serem executadas
        $result = array();

        $query = DB::table('app_camareira_quartos as cq')
            ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
            ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
            ->join('app_status as s', 's.id', '=', 'cq.status_id')
            ->join('app_servicos as s2', 's2.id', '=', 'cq.servico_id')
            ->select('cq.id as id','c.nome as camareira','q.numero as numero',
            'q.andar as andar','s.status as status','s2.tipo as servico',
            'q.cama_solteiro as cama_solteiro', 'q.cama_casal as cama_casal','q.banheira as banheira','cq.created_at as create')
            ->get();

        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['camareira'] = $item->camareira;
            $result[$i]['status'] = $item->status;
            $result[$i]['service'] = $item->servico;
            $result[$i]['room']['number'] = $item->numero;
            $result[$i]['room']['floor'] = $item->andar;
            $result[$i]['room']['single_bed'] = $item->cama_solteiro;
            $result[$i]['room']['double_bed'] = $item->cama_casal;
            $result[$i]['room']['bathtub'] = $item->banheira;

            $result[$i]['consum'] = AppConsumo::getByAtividade($item->id);
            $result[$i]['manutencao'] = AppManutencao::getByAtividade($item->id);
            $result[$i]['lavanderia'] = AppLavanderia::getByAtividade($item->id);

            $data = explode(' ',$item->create);
            $result[$i]['created']["time"] = $data[1];
            $data = explode('-', $data[0]);
            $result[$i]['created']["date"] = $data[2].'/'.$data[1].'/'.$data[0];

            $i++;
        }
        return $result;
    }

    static function getAllServicos(){
        $result = array();

        $query = AppServicos::orderBy('tipo','asc')->get();
        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['service'] = $item->tipo;
            $i++;
        }
        return $result;
    }
    
    static function getById($id){
    $query = DB::table('app_camareira_quartos as cq')
                ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
                ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
                ->join('app_status as s', 's.id', '=', 'cq.status_id')
                ->join('app_servicos as s2', 's2.id', '=', 'cq.servico_id')
                ->where('cq.id','=',$id)
                ->select('cq.id as id','c.nome as camareira','q.numero as numero',
                'q.andar as andar','s.status as status','s2.tipo as servico',
                'q.cama_solteiro as cama_solteiro', 'q.cama_casal as cama_casal','q.banheira as banheira', 'cq.created_at as create')
                ->get();

        $i = 0;
        foreach($query as $item){
            $result[$i]['id'] = $item->id;
            $result[$i]['camareira'] = $item->camareira;
            $result[$i]['status'] = $item->status;
            $result[$i]['service'] = $item->servico;
            $result[$i]['room']['number'] = $item->numero;
            $result[$i]['room']['floor'] = $item->andar;
            $result[$i]['room']['single_bed'] = $item->cama_solteiro;
            $result[$i]['room']['double_bed'] = $item->cama_casal;
            $result[$i]['room']['bathtub'] = $item->banheira;


            $data = explode(' ',$item->create);
            $result[$i]['created']["time"] = $data[1];
            $data = explode('-', $data[0]);
            $result[$i]['created']["date"] = $data[2].'/'.$data[1].'/'.$data[0];
            $i++;
        }
    }
}
