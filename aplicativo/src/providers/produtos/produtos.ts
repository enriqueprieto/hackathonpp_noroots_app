import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Api } from '../../app/models/api';

/*
  Generated class for the ProdutosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutosProvider {
  api:any = new Api();
  endpoint:string = this.api.getEndpoint();
  constructor(
    public http: HttpClient,
    private loadingCtrl: LoadingController
  ) {
  }
  public getStaticInfo(){
    let limit   = 10,
        result  = [];
    for(var i = 0; i < limit; i++){
      let item = {
        room: {
          number: (100+i),
          beds: {
            single: 0,
            double: 0
          },
          floor: 2,
          bathtub: false          
        },
        service: 'Limpeza',
        camareira: 'Maria Lúcia',
        status: 'Pendente',
        created: {
          date: '00/00/0000',
          time: '00:00'
        }
      };
      result.push(item);
    }
    return result;
  }
  public getAllByApi(cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/produtos',
        loading = this.loadingCtrl.create({
          content: 'Carregando os produtos'
        });
    loading.present();
    this.http.get(url, {})
    .subscribe((result:any)=>{
      loading.dismiss();
      cbSuccess(result);
    }), (error:any)=>{
      loading.dismiss();
      if(cbError){
        cbError(error);
      }
    };
  }
  public getOptionsByApi(cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/atividades/selecao',
        loading = this.loadingCtrl.create({
          content: 'Carregando as opções'
        });
    loading.present();
    this.http.get(url, {})
    .subscribe((result:any)=>{
      loading.dismiss();
      cbSuccess(result);
    }), (error:any)=>{
      loading.dismiss();
      if(cbError){
        cbError(error);
      }
    };
  }
  public saveOnApi(params:any, cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/atividades/add',
        loading = this.loadingCtrl.create({
          content: 'Salvando a atividade'
        });
    loading.present();
    this.http.post(url, params, {})
    .subscribe((result:any)=>{
      loading.dismiss();
      cbSuccess(result);
    }), (error:any)=>{
      loading.dismiss();
      if(cbError){
        cbError(error);
      }
    };
  }
  public removeOnApi(params:any, cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/atividades/remove',
        loading = this.loadingCtrl.create({
          content: 'Removendo a atividade'
        });
    loading.present();
    this.http.post(url, params, {})
    .subscribe((result:any)=>{
      loading.dismiss();
      cbSuccess(result);
    }), (error:any)=>{
      loading.dismiss();
      if(cbError){
        cbError(error);
      }
    };
  }
  public changeStatus(params:any, cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/atividades/update',
        loading = this.loadingCtrl.create({
          content: 'Atualizando a atividade'
        });
    loading.present();
    this.http.post(url, params, {})
    .subscribe((result:any)=>{
      loading.dismiss();
      cbSuccess(result);
    }), (error:any)=>{
      loading.dismiss();
      if(cbError){
        cbError(error);
      }
    };
  }

}
