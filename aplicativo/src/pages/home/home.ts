import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CamareirasListPage } from '../camareiras-list/camareiras-list';
import { QuartosListPage } from '../quartos-list/quartos-list';
import { AtividadesListPage } from '../atividades-list/atividades-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  click2Camareiras(){
    this.navCtrl.push(CamareirasListPage);
  }
  click2Quartos(){
    this.navCtrl.push(QuartosListPage);
  }
  click2Atividades(){
    this.navCtrl.push(AtividadesListPage);
  }
}
