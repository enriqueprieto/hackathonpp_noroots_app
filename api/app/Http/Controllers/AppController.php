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
                $result['atividades'] = AppServicos::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function get_atividades_id($id){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['atividades'] = AppServicos::getById($id);
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

        public function get_atividades_selecao(){
            $result = array(); 
            try{
                $result['quartos'] = AppQuartos::getAll();
                $result['servicos'] = AppServicos::getAllServicos();
                $result['camareiras'] = AppCamareiras::getAll();
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
                $params['numero'] = $request->room;
                $params['servico'] = $request->service;
                $params['camareira'] = $request->camareira;

                $atv = new AppCamareiraQuartos();
                $atv->quarto_id = $params['numero']; 
                $atv->servico_id = $params['servico']; 
                $atv->camareira_id = $params['camareira'];  
                $atv->status_id = 1;
                $atv->save();
                $result['status'] = true;
                $result['atividades'] = AppServicos::getAll();
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
                    $result['atividades'] = AppServicos::getAll();
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
                    $result['atividade'] = AppServicos::getById($params['id']);
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
        public function get_produtos(){
            $result = array(); 
            try{
                $result['status'] = true;
                $result['product'] = Appprodutos::getAll();
            }catch(Exception $e){
                $result['status'] = false;
                $result["msg"] = $e->getMessage();
            }
            return $result;
        }

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
                    ->join('app_camareira_quartos as cq', 'cq.id', '=', 'c.atividade_id')
                    ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
                    ->join('app_camareiras as c2', 'c2.id', '=', 'cq.camareira_id')
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
                $params['atividade_id'] = $request->atividade;
                $params['produto'] = $request->product;
                
                $consumo = new AppConsumo();
                $consumo->atividade_id = $params['atividade_id'];
                $consumo->save();
                foreach($params['produto'] as $item){
                    $produto = new AppItensConsumo();
                    $produto->consumo_id = $consumo->id;
                    $produto->produto_id = $item['id'];
                    $produto->qtde = $item['count'];
                    $produto->save();
                }
                $result['status'] = true;
                $result['atividade'] = AppServicos::getById($params['atividade_id']);
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
                    ->join('app_camareira_quartos as cq', 'cq.id', '=', 'm.atividade_id')
                    ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
                    ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
                    ->where('id', '=', $id)
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
                $params['atividade'] = $request->atividade;
                $params['descricao'] = $request->description;
                
                $manutencao = new AppManutencao();
                $manutencao->atividade_id = $params['atividade'];
                $manutencao->descricao = $params['descricao'];
                $manutencao->save();
                $result['status'] = true;
                $result['atividade'] = AppServicos::getById($params['atividade']);
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
                ->join('app_camareira_quartos as cq', 'cq.id', '=', 'l.atividade_id')
                ->join('app_camareiras as c', 'c.id', '=', 'cq.camareira_id')
                ->join('app_quartos as q', 'q.id', '=', 'cq.quarto_id')
                ->where('id', '=', $id)
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
                $params['atividade'] = $request->atividade;
                $params['descricao'] = $request->description;
                
                $lavanderia = new AppLavanderia();
                $lavanderia->atividade_id = $params['atividade'];
                $lavanderia->descricao = $params['descricao'];
                $lavanderia->save();
                $result['status'] = true;
                $result['atividade'] = AppServicos::getById($params['atividade']);
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