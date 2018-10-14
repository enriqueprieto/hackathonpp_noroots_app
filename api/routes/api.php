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
    //GET
        Route::get('/app/office/atividades', 'AppController@get_atividades');
        Route::get('/app/office/atividades/{id}', 'AppController@get_atividades_id');
    //ADICIONAR
        Route::post('/app/office/atividades/add', 'AppController@add_atividades');
    //REMOVER
        Route::post('/app/office/atividades/remove', 'AppController@remove_atividades');
    //ATUALIZAR
        Route::post('/app/office/atividades/remove', 'AppController@update_atividades');
//CONSUMO
    //GET
        Route::get('/app/office/consumo', 'AppController@get_consumo');
        Route::get('/app/office/consumo/{id}', 'AppController@get_consumo_id');
    //ADICIONAR
        Route::post('/app/office/consumo/add', 'AppController@add_consumo');
//MANUTENCAO
    //GET
        Route::get('/app/office/manutencao', 'AppController@get_manutencao');
        Route::get('/app/office/manutencao/{id}', 'AppController@get_manutencao_id');
    //ADICIONAR
        Route::post('/app/office/manutencao/add', 'AppController@add_manutencao');
//LAVANDERIA
    //GET
        Route::get('/app/office/lavanderia', 'AppController@get_lavanderia');
        Route::get('/app/office/lavanderia/{id}', 'AppController@get_lavanderia_id');
    //ADICIONAR
        Route::post('/app/office/lavanderia/add', 'AppController@add_lavanderia');

