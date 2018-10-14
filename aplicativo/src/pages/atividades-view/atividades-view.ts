import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { AtividadesProvider } from '../../providers/atividades/atividades';
import { AtividadesConsumoAddPage } from '../atividades-consumo-add/atividades-consumo-add';
import { AtividadesManutencoesAddPage } from '../atividades-manutencoes-add/atividades-manutencoes-add';
import { AtividadesLavanderiaAddPage } from '../atividades-lavanderia-add/atividades-lavanderia-add';

/**
 * Generated class for the AtividadesViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades-view',
  templateUrl: 'atividades-view.html',
})
export class AtividadesViewPage {
  atividade:any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private atividadeProvider: AtividadesProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private events: Events
  ) {
    this.atividade = this.navParams.get('atividade');
    this.events.subscribe('atividade:updated', (data)=>{
      this.atividade = data;
    });
  }
  ionViewDidLoad() {
    
  }
  click2ConsumoAdd(){
    let modal = this.modalCtrl.create(AtividadesConsumoAddPage, {
      'atividade' : this.atividade.id
    });
    modal.present();
  }
  click2ManutencoesAdd(){
    let modal = this.modalCtrl.create(AtividadesManutencoesAddPage, {
      'atividade' : this.atividade.id
    });
    modal.present();
  }
  click2LavanderiaAdd(){
    let modal = this.modalCtrl.create(AtividadesLavanderiaAddPage, {
      'atividade' : this.atividade.id
    });
    modal.present();
  }
  clickChangeStatus2Doing(){
    let params = {
      id: this.atividade.id,
      status: 2
    };
    this.atividadeProvider.changeStatus(params, (result:any)=>{
      if(result.status){
        this.atividade = result.atividade;
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
  clickChangeStatus2Done(){
    let params = {
      id: this.atividade.id,
      status: 3
    };
    this.atividadeProvider.changeStatus(params, (result:any)=>{
      if(result.status){
        this.atividade = result.atividade;
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
  clickChangeStatus2Finish(){
    let params = {
      id: this.atividade.id,
      status: 4
    };
    this.atividadeProvider.changeStatus(params, (result:any)=>{
      if(result.status){
        this.atividade = result.atividade;
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
}
