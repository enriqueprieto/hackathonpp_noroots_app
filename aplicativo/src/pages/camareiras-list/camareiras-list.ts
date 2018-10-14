import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';
import { CamareiraViewPage } from '../camareira-view/camareira-view';
import { CamareiraAddPage } from '../camareira-add/camareira-add';

/**
 * Generated class for the CamareirasListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camareiras-list',
  templateUrl: 'camareiras-list.html',
})
export class CamareirasListPage {
  camareiras:any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camareirasProvider:CamareirasProvider,
    private modalCtrl:ModalController,
    private alertCtrl: AlertController,
    private events:Events
  ) {
    this.camareiras = this.camareirasProvider.getStaticInfo();
    this.camareirasProvider.getAllByApi((result:any)=>{
      if(result.status){
        this.camareiras = result.camareiras;
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
    this.events.subscribe('camareiras:updated', (data:any)=>{
      this.camareiras = data;
    });
  }

  ionViewDidLoad() {
  }
  click2View(item){
    let modal = this.modalCtrl.create(CamareiraViewPage, {
      'camareira' : item
    });
    modal.present();
  }
  click2Add(){
    let modal = this.modalCtrl.create(CamareiraAddPage);
    modal.present();
  }
}
