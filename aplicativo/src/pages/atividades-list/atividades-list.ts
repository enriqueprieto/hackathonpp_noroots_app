import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { AtividadesProvider } from '../../providers/atividades/atividades';
import { AtividadesAddPage } from '../atividades-add/atividades-add';
import { AtividadesViewPage } from '../atividades-view/atividades-view';

/**
 * Generated class for the AtividadesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades-list',
  templateUrl: 'atividades-list.html',
})
export class AtividadesListPage {
  atividades:any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private atividadesProvider: AtividadesProvider,
    private alertCtrl: AlertController,
    private events: Events
  ) {
    this.atividades = this.atividadesProvider.getStaticInfo();
    this.atividadesProvider.getAllByApi((result:any)=>{
      if(result.status){
        this.atividades = result.atividades;
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
    this.events.subscribe('atividades:updated', (data:any)=>{
      this.atividades = data;
    });
  }
  
  click2View(item){
    let modal = this.modalCtrl.create(AtividadesViewPage, {
      'atividade': item
    });
    modal.present();
  }
  click2Add(){
    let modal = this.modalCtrl.create(AtividadesAddPage);
    modal.present();
  }

}
