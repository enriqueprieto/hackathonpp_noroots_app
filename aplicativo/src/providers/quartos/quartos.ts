import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../../app/models/api';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the QuartosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuartosProvider {
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
        id: i,
        number: (100+i),
        single_bed: 0,
        double_bed: 0,
        floor: 2,
        bath: false
      };
      result.push(item);
    }
    return result;
  }
  public getAllByApi(cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/quartos',
        loading = this.loadingCtrl.create({
          content: 'Carregando os quartos'
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
    let url     = this.endpoint+'app/office/quartos/add',
        loading = this.loadingCtrl.create({
          content: 'Salvando o quarto'
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
    let url     = this.endpoint+'app/office/quartos/remove',
        loading = this.loadingCtrl.create({
          content: 'Removendo o quarto'
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
