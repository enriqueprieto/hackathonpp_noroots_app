import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';

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
    public navParams: NavParams
  ) {
    this.atividade = this.navParams.get('atividade');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AtividadesViewPage');
  }

}
