import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { QuartosProvider } from '../../providers/quartos/quartos';

/**
 * Generated class for the QuartosViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quartos-view',
  templateUrl: 'quartos-view.html',
})
export class QuartosViewPage {
  quarto:any = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private quartosProvider: QuartosProvider,
    private events: Events
  ) {
    this.quarto = this.navParams.get('quarto');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuartosViewPage');
  }
  click2Remove(){
    let alert = this.alertCtrl.create({
      title: 'Remover quarto?',
      subTitle: 'Tem certeza de remover quarto?',
      buttons: [
        {
          text: 'Sim, tenho certeza',
          handler: ()=>{
            let params = {
              id: this.quarto.id
            };
            this.quartosProvider.removeOnApi(params, (result:any)=>{
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
          }
        },
        'Não, obrigado'
      ]
    });
    alert.present();
  }
}
