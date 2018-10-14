<?php

namespace App\Http\Controllers;

use App\AppCamareiraQuartos;
use App\AppCamareiras;
use App\AppConsumo;
use App\AppItensConsumo;
use App\AppLavanderia;
use App\AppManutencao;
use App\AppProdutos;
use App\AppQuartos;
use App\AppServicos;
use App\AppStatus;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AppController extends Controller
{
    /*
        *****************************************************************************
            CAMAREIRAS
        *****************************************************************************
    */
        public function get_camareiras(){
            $result = array(); 
            
            try{
                
                $result['status'] = true;
                $result['camareiras'] = AppCamareiras::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function add_camareiras(Request $request){
            $result = array(); 
            try{
                $params['nome'] = $request->name;
                $params['turno'] = $request->period;

                $camareira = new AppCamareiras();
                $camareira->nome = $params['nome']; 
                $camareira->turno = $params['turno'];
                $camareira->save();
                $result['status'] = true;
                $result['camareiras'] = AppCamareiras::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function remove_camareiras(Request $request){
            $result = array(); 
            try{
                $params['id'] = $request->id;
                
                $camareira = AppCamareiras::where('id',$params['id']);
                
                if($camareira->get()->count() > 0){
                    $camareira->delete();
                    $result['status'] = true;
                    $result['camareiras'] = AppCamareiras::getAll();
                }else{
                    $result['status'] = false;
                    $result["msg"] = 'Camareira não encontrada';
                }
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }
    /*
        *****************************************************************************
            QUARTOS
        *****************************************************************************
    */
        public function get_quartos(){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['quartos'] = AppQuartos::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function add_quartos(Request $request){
            $result = array(); 
            try{
                $params['numero'] = $request->number;
                $params['andar'] = $request->floor;
                $params['cama_solteiro'] = $request->single_bed;
                $params['cama_casal'] = $request->double_bed;
                $params['banheira'] = $request->bathtub;

                $quarto = new AppQuartos();
                $quarto->numero = $params['numero']; 
                $quarto->andar = $params['andar']; 
                $quarto->cama_solteiro = $params['cama_solteiro']; 
                $quarto->cama_casal = $params['cama_casal']; 
                $quarto->banheira = $params['banheira']; 
                $quarto->save();
                $result['status'] = true;
                $result['quartos'] = AppQuartos::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function remove_quartos(Request $request){
            $result = array(); 
            try{
                $params['id'] = $request->id;
                
                $quarto = AppQuartos::where('id',$params['id']);
                
                if($quarto->get()->count() > 0){
                    $quarto->delete();
                    $result['status'] = true;
                    $result['quartos'] = AppQuartos::getAll();
                }else{
                    $result['status'] = false;
                    $result["msg"] = 'Quarto não encontrado';
                }
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }
    /*
        *****************************************************************************
            ATIVIDADES
        *****************************************************************************
    */
        public function get_atividades(){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['room'] = AppServicos::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function get_atividades_id($id){
            $result = array(); 
            try{
                $query = DB::table('app_camareira_quartos as cq')
                            ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
                            ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
                            ->join('app_status as s', 's.id', '=', 'cq.status_id')
                            ->join('app_servicos as s2', 's2.id', '=', 'cq.servico_id')
                            ->where('cq.id','=',$id)
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
                $result['status'] = true;
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function add_atividade(Request $request){
            $result = array(); 
            try{
                $params['numero'] = $request->number;
                $params['servico'] = $request->service;
                $params['camareira'] = $request->camareira;

                $atv = new AppCamareiraQuartos();
                $atv->numero_id = $params['numero']; 
                $atv->servico_id = $params['servico']; 
                $atv->camareira_id = $params['camareira'];  
                $atv->status = 1;
                $atv->save();
                $result['status'] = true;
                $result['room'] = AppServicos::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function remove_atividade(Request $request){
            $result = array(); 
            try{
                $params['id'] = $request->id;
                
                $atv = AppCamareiraQuartos::where('id',$params['id']);
                
                if($atv->get()->count() > 0){
                    $atv->delete();
                    $result['status'] = true;
                    $result['room'] = AppServicos::getAll();
                }else{
                    $result['status'] = false;
                    $result["msg"] = 'Atividade não encontrada';
                }
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function update_atividade(Request $request){
            $result = array(); 
            try{
                $params['id'] = $request->id;
                $params['status_id'] = $request->status;
                
                $atv = AppCamareiraQuartos::where('id',$params['id']);
                
                if($atv->get()->count() > 0){
                    $args['status_id'] = $params['status_id'];
                    $atv->update($args);
                    $result['status'] = true;
                    $result['sevices'] = AppServicos::getAll();
                }else{
                    $result['status'] = false;
                    $result["msg"] = 'Atividade não encontrada';
                }
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }
    /*
        *****************************************************************************
            CONSUMO
        *****************************************************************************
    */
        public function get_consumo(){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['consum'] = AppConsumo::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function get_consumo_id($id){
            $result = array(); 
            try{
                $query = DB::table('app_consumo as c')
                        ->join('app_camareiras as c2', 'c2.id', '=', 'c.camareira_id')
                        ->join('app_quartos as q', 'q.id', '=', 'c.quarto_id')
                        ->where('id', '=', $id)
                        ->select('c.id as id', 'c2.id as camareira_id','c2.nome as camareira'
                        , 'q.numero as numero', 'q.andar as andar')->get();

                foreach($query as $item){
                    $result['id'] = $item->id;
                    $result['camareira_id'] = $item->camareira_id;
                    $result['camareira'] = $item->camareira;
                    $result['number'] = $item->numero;
                    $result['floor'] = $item->andar;

                    $consumo = AppItensConsumo::where('consumo_id',$item->id)->get();
                    $j = 0;
                    foreach($consumo as $item2){
                        $produto = AppProdutos::where('id',$item2->produto_id);
                        $result[$i]['products'][$j]['id'] = $produto->id;
                        $result[$i]['products'][$j]['name'] = $produto->nome;
                        $j++;
                    }
                }
                $result['status'] = true;
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function add_consumo(Request $request){
            $result = array(); 
            try{
                $params['camareira_id'] = $request->camareira;
                $params['quarto_id'] = $request->number;
                $params['produto'] = $request->product;
                
                $consumo = new AppConsumo();
                $consumo->camareira_id = $params['camareira_id'];
                $consumo->quarto_id = $params['quarto_id'];
                $consumo->save();
                foreach($params['produto'] as $item){
                    $produto = AppItensConsumo();
                    $produto->consumo_id = $consumo->id;
                    $produto->produto_id = $item->id;
                    $produto->save();
                }
                $result['status'] = true;
                $result['consum'] = AppConsumo::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            
            return $result;
        }
    /*
        *****************************************************************************
            MANUTENCAO
        *****************************************************************************
    */
        public function get_manutencao(){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['manutencao'] = AppManutencao::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function get_manutencao_id($id){
            $result = array(); 
            try{
                $query = DB::table('app_manutencao as m')
                ->join('app_camareiras as c', 'c.id', '=', 'm.camareira_id')
                ->join('app_quartos as q', 'q.id', '=', 'm.quarto_id')
                ->select('m.id as id', 'c.id as camareira_id','c.nome as camareira'
                ,'q.numero as numero', 'q.andar as andar')->get();

                foreach($query as $item){
                    $result['id'] = $item->id;
                    $result['camareira_id'] = $item->camareira_id;
                    $result['camareira'] = $item->camareira;
                    $result['number'] = $item->numero;
                    $result['floor'] = $item->andar;
                    $result['description'] = $item->descricao;
                }
                $result['status'] = true;
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }
        
        public function add_manutencao(Request $request){
            $result = array(); 
            try{
                $params['camareira_id'] = $request->camareira;
                $params['quarto_id'] = $request->number;
                $params['descricao'] = $request->description;
                
                $manutencao = new AppManutencao();
                $manutencao->camareira_id = $params['camareira_id'];
                $manutencao->quarto_id = $params['quarto_id'];
                $manutencao->descricao = $params['descricao'];
                $manutencao->save();
                $result['status'] = true;
                $result['manutencao'] = AppManutencao::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            
            return $result;
        }
    /*
        *****************************************************************************
            LAVANDERIA
        *****************************************************************************
    */
        public function get_lavanderia(){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['lavanderia'] = AppLavanderia::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function get_lavanderia_id($id){
            $result = array(); 
            try{
                $query = DB::table('app_lavanderia as l')
                ->join('app_camareiras as c', 'c.id', '=', 'l.camareira_id')
                ->join('app_quartos as q', 'q.id', '=', 'l.quarto_id')
                ->select('l.id as id', 'c.id as camareira_id','c.nome as camareira'
                ,'q.numero as numero', 'q.andar as andar')->get();
  
                foreach($query as $item){
                    $result['id'] = $item->id;
                    $result['camareira_id'] = $item->camareira_id;
                    $result['camareira'] = $item->camareira;
                    $result['number'] = $item->numero;
                    $result['floor'] = $item->andar;
                    $result['description'] = $item->descricao;
                }
                $result['status'] = true;
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }
        
        public function add_lavanderia(Request $request){
            $result = array(); 
            try{
                $params['camareira_id'] = $request->camareira;
                $params['quarto_id'] = $request->number;
                $params['descricao'] = $request->description;
                
                $lavanderia = new AppLavanderia();
                $lavanderia->camareira_id = $params['camareira_id'];
                $lavanderia->quarto_id = $params['quarto_id'];
                $lavanderia->descricao = $params['descricao'];
                $lavanderia->save();
                $result['status'] = true;
                $result['lavanderia'] = AppLavanderia::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }
    /*
        *****************************************************************************
            >>>>>>>>>>>>>>>>>>>>END<<<<<<<<<<<<<<<<<<<<
        *****************************************************************************
    */
}