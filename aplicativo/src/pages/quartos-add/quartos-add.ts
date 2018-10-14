import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { QuartosProvider } from '../../providers/quartos/quartos';

/**
 * Generated class for the QuartosAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quartos-add',
  templateUrl: 'quartos-add.html',
})
export class QuartosAddPage {
  quarto:any = {
    number: null,
    floor: '',
    beds: {
      single: 0,
      double: 0
    },
    bathtub: ''
  };
  floors:any = [1,2,3,4,5,6];
  validation:any = {
    hasError: false
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private events: Events,
    private alertCtrl: AlertController,
    private quartosProvider: QuartosProvider
  ) {
  }
  click2AddBed(type){
    switch(type){
      case 'single':
        this.quarto.beds.single++;
        break;
      case 'double':
        this.quarto.beds.double++;
        break;
    }
  }
  click2RemoveBed(type){
    switch(type){
      case 'single':
        if(this.quarto.beds.single > 0){
          this.quarto.beds.single--;
        }
        break;
        case 'double':
          if(this.quarto.beds.double > 0){
            this.quarto.beds.double--;
          }
        break;
    }
  }
  clickSave(){
    this.validation.hasError = false;
    if(!this.quarto.number){
      this.validation.hasError = true;
    }
    if(this.quarto.floor == ''){
      this.validation.hasError = true;
    }
    if(this.quarto.bathtub == ''){
      this.validation.hasError = true;
    }
    if(this.quarto.beds.single == 0 && this.quarto.beds.double == 0){
      this.validation.hasError = true;
    }
    if(!this.validation.hasError){
      let params = {
        number: this.quarto.number,
        floor: this.quarto.floor,
        single_bed: this.quarto.beds.single,
        double_bed: this.quarto.beds.double,
        bathtub: this.quarto.bathtub
      };
      this.quartosProvider.saveOnApi(params, (result:any)=>{
        if(result.status){
          this.navCtrl.pop();
          this.events.publish('quartos:updated', result.quartos);
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
