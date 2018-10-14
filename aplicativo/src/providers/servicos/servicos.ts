import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServicosProvider Provider');
  }
  public getStaticInfo(){
    let limit   = 10,
        result  = [];
    for(var i = 0; i < limit; i++){
      let item = {
        id: i,
        name:'Serviço '+i
      };
      result.push(item);
    }
    return result;
  }
}
