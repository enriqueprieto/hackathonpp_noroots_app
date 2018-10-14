import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';

/**
 * Generated class for the CamareiraViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camareira-view',
  templateUrl: 'camareira-view.html',
})
export class CamareiraViewPage {
  camareira:any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private camareirasProvider: CamareirasProvider,
    private events: Events
  ) {
    this.camareira = this.navParams.get('camareira');
  }
  ionViewDidLoad() {
  }
  click2Remove(){
    let alert = this.alertCtrl.create({
      title: 'Remover camareira?',
      subTitle: 'Você tem certeza que deseja remover esta camareira do sistema?',
      buttons: [
        {
          text: 'Sim, tenho certeza',
          handler: ()=>{
            let params = {
              id: this.camareira.id
            };
            this.camareirasProvider.removeOnApi(params, (result:any)=>{
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
          }
        },
        {
          text: 'Não, obrigado',
          handler: ()=> {

          }
        }
      ]
    });
    alert.present();
  }
}
