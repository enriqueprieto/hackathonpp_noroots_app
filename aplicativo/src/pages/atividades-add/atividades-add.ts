import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { QuartosProvider } from '../../providers/quartos/quartos';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { AtividadesProvider } from '../../providers/atividades/atividades';

/**
 * Generated class for the AtividadesAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades-add',
  templateUrl: 'atividades-add.html',
})
export class AtividadesAddPage {
  atividade:any = {
    room: '',
    service: '',
    camareira: ''
  };
  rooms:any = null;
  services:any = null;
  camareiras:any = null;
  validation:any = {
    hasError: false
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private quartosProvider: QuartosProvider,
    private camareirasProvider: CamareirasProvider,
    private servicosProvider: ServicosProvider,
    private atividadesProvider: AtividadesProvider,
    private events: Events,
    private alertCtrl: AlertController
  ) {
    this.rooms = this.quartosProvider.getStaticInfo();
    this.camareiras = this.camareirasProvider.getStaticInfo();
    this.services = this.servicosProvider.getStaticInfo();
    this.atividadesProvider.getOptionsByApi((result:any)=>{
      this.rooms = result.quartos;
      this.camareiras = result.camareiras;
      this.services = result.servicos;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtividadesAddPage');
  }
  clickSave(){
    this.validation.hasError = false;
    if(this.atividade.room == ''){
      this.validation.hasError = true;
    }
    if(this.atividade.service == ""){
      this.validation.hasError = true;
    }
    if(this.atividade.camareira == ""){
      this.validation.hasError = true;
    }
    if(!this.validation.hasError){
      let params = {
        camareira: this.atividade.camareira,
        service: this.atividade.service,
        room: this.atividade.room
      };
      this.atividadesProvider.saveOnApi(params, (result:any)=>{
        if(result.status){
          this.navCtrl.pop();
          this.events.publish('atividades:updated', result.atividades);
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
