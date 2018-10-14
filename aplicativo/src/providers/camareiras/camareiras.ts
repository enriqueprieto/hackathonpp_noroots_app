import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../../app/models/api';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the CamareirasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CamareirasProvider {
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
        name: 'Camareira Fake '+i,
        period: 'Noturno'
      };
      result.push(item);
    }
    return result;
  }
  public getAllByApi(cbSuccess:any, cbError:any = null){
    let url     = this.endpoint+'app/office/camareiras',
        loading = this.loadingCtrl.create({
          content: 'Carregando as camareiras'
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
    let url     = this.endpoint+'app/office/camareiras/add',
        loading = this.loadingCtrl.create({
          content: 'Salvando a camareira'
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
    let url     = this.endpoint+'app/office/camareiras/remove',
        loading = this.loadingCtrl.create({
          content: 'Removendo a camareira'
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
