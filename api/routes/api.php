<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'cors'], function(){
    //CAMAREIRAS
        //GET
            Route::get('/app/office/camareiras', 'AppController@get_camareiras');
        //ADICIONAR
            Route::post('/app/office/camareiras/add', 'AppController@add_camareiras');
        //REMOVER
            Route::post('/app/office/camareiras/remove', 'AppController@remove_camareiras');
    //QUARTOS
        //GET
            Route::get('/app/office/quartos', 'AppController@get_quartos');
        //ADICIONAR
            Route::post('/app/office/quartos/add', 'AppController@add_quartos');
        //REMOVER
            Route::post('/app/office/quartos/remove', 'AppController@remove_quartos');
    //ATIVIDADES
        //ADICIONAR
            Route::post('/app/office/atividades/add', 'AppController@add_atividade');
        //REMOVER
            Route::post('/app/office/atividades/remove', 'AppController@remove_atividade');
        //ATUALIZAR
            Route::post('/app/office/atividades/update', 'AppController@update_atividade');
        //GET
            Route::get('/app/office/atividades', 'AppController@get_atividades');
            Route::get('/app/office/atividades/selecao', 'AppController@get_atividades_selecao');
            Route::get('/app/office/atividades/{id}', 'AppController@get_atividades_id');
    //CONSUMO
        //ADICIONAR
            Route::post('/app/office/consumo/add', 'AppController@add_consumo');
        //GET
            Route::get('/app/office/produtos', 'AppController@get_produtos');
            Route::get('/app/office/consumo', 'AppController@get_consumo');
            Route::get('/app/office/consumo/{id}', 'AppController@get_consumo_id');
    //MANUTENCAO
        //ADICIONAR
            Route::post('/app/office/manutencao/add', 'AppController@add_manutencao');
        //GET
            Route::get('/app/office/manutencao', 'AppController@get_manutencao');
            Route::get('/app/office/manutencao/{id}', 'AppController@get_manutencao_id');
    //LAVANDERIA
    //ADICIONAR
        Route::post('/app/office/lavanderia/add', 'AppController@add_lavanderia');
    //GET
        Route::get('/app/office/lavanderia', 'AppController@get_lavanderia');
        Route::get('/app/office/lavanderia/{id}', 'AppController@get_lavanderia_id');
});
