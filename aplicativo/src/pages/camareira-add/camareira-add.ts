import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';

/**
 * Generated class for the CamareiraAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camareira-add',
  templateUrl: 'camareira-add.html',
})
export class CamareiraAddPage {
  camareira:any = {
    name: null,
    period: ""
  };
  validation:any = {
    hasError: false
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private camareirasProvider: CamareirasProvider,
    private events:Events
  ) {
  }

  ionViewDidLoad() {
  }
  clickSave(){
    this.validation.hasError = false;
    if(!this.camareira.name){
      this.validation.hasError = true;
    }
    if(this.camareira.period == ""){
      this.validation.hasError = true;
    }
    if(!this.validation.hasError){
      let params = {
        name: this.camareira.name,
        period: this.camareira.period
      };
      this.camareirasProvider.saveOnApi(params, (result:any)=>{
        if(result.status){
          this.navCtrl.pop();
          this.events.publish('camareiras:updated', result.camareiras);
        }else{
          let alert = this.alertCtrl.create({
            title: 'Ops :(',
            subTitle: 'Aconteceu algo não esperado',
            message: result.msg,
            buttons: ['Ok']
          });
          alert.present();
        }
      }, (error:any)=>{
          let alert = this.alertCtrl.create({
            title: 'Ops :(',
            subTitle: 'Aconteceu algo não esperado',
            message: 'Error code: '+error.status,
            buttons: ['Ok']
          });
          alert.present();

      });
    }else{
      let alert = this.alertCtrl.create({
        title: 'Ops :(',
        subTitle: 'Algo aconteceu que não era esperado',
        message: 'Preencha os campos do formulário corretamente para salvar no sistema.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}
