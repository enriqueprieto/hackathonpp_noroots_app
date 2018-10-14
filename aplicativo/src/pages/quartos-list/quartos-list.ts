import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import { QuartosProvider } from '../../providers/quartos/quartos';
import { QuartosViewPage } from '../quartos-view/quartos-view';
import { QuartosAddPage } from '../quartos-add/quartos-add';

/**
 * Generated class for the QuartosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quartos-list',
  templateUrl: 'quartos-list.html',
})
export class QuartosListPage {
  quartos:any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private quartosProvider: QuartosProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private events: Events
  ) {
    this.quartos = this.quartosProvider.getStaticInfo();
    this.quartosProvider.getAllByApi((result:any)=>{
      if(result.status){
        this.quartos = result.quartos;
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
    this.events.subscribe('quartos:updated', (data:any)=>{
      this.quartos = data;
    });
  }

  ionViewDidLoad() {
  }
  
  click2View(item){
    let modal = this.modalCtrl.create(QuartosViewPage, {
      'quarto' : item
    });
    modal.present();
  }
  click2Add(){
    let modal = this.modalCtrl.create(QuartosAddPage);
    modal.present();
  }
}
