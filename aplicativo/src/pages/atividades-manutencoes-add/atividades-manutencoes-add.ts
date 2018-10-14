import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { AtividadesProvider } from '../../providers/atividades/atividades';

/**
 * Generated class for the AtividadesManutencoesAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades-manutencoes-add',
  templateUrl: 'atividades-manutencoes-add.html',
})
export class AtividadesManutencoesAddPage {
  manutencao:any = {
    description: null
  };
  atividade:any = null;
  validation:any = {
    hasError: false
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private atividadesProvider: AtividadesProvider,
    private alertCtrl: AlertController,
    private events: Events
  ) {
    this.atividade = this.navParams.get('atividade');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtividadesManutencoesAddPage');
  }
  clickSave(){
    this.validation.hasError = false;
    if(!this.manutencao.description){
      this.validation.hasError = true;
    }
    if(!this.validation.hasError){
      let params = {
        atividade: this.atividade,
        description: this.manutencao.description
      };
      this.atividadesProvider.saveManutencaoOnApi(params, (result:any)=>{
        if(result.status){
          this.navCtrl.pop();
          this.events.publish('atividade:updated', result.atividade);
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
        subTitle: 'Algo não saiu como o esperado',
        message: 'Preencha todos os campos para salvar no sistema',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}
