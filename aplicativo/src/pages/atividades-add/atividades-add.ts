import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuartosProvider } from '../../providers/quartos/quartos';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';
import { ServicosProvider } from '../../providers/servicos/servicos';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private quartosProvider: QuartosProvider,
    private camareirasProvider: CamareirasProvider,
    private servicosProvider: ServicosProvider
  ) {
    this.rooms = this.quartosProvider.getStaticInfo();
    this.camareiras = this.camareirasProvider.getStaticInfo();
    this.services = this.servicosProvider.getStaticInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtividadesAddPage');
  }

}
