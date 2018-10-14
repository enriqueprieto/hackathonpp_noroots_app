import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { AtividadesProvider } from '../../providers/atividades/atividades';

/**
 * Generated class for the AtividadesConsumoAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atividades-consumo-add',
  templateUrl: 'atividades-consumo-add.html',
})
export class AtividadesConsumoAddPage {
  atividade:any = null;
  produtos:any = null;
  validation:any = {
    hasError: false
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private produtosProvider: ProdutosProvider,
    private atividadesProvider: AtividadesProvider,
    private alertCtrl: AlertController,
    private events: Events
  ) {
    this.produtos = this.produtosProvider.getStaticInfo();
    this.atividade = this.navParams.get('atividade');
    this.produtosProvider.getAllByApi((result:any)=>{
      if(result.status){
        this.produtos = this.makeProductsStructure(result.product);
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
  makeProductsStructure(produtos){
    let result = [];
    produtos.forEach((item, index)=>{
      let product:any = item;
      product.count = 0;
      result.push(product);
    });
    return result;
  }
  clickSumCountInProduct(product){
    product.count++;
  }
  clickRemoveCountInProduct(product){
    if(product.count > 0){
      product.count--;
    }
  }
  ionViewDidLoad() {
  }
  clickSave(){
    this.validation.hasError = true;
    let produtos = [];
    this.produtos.forEach((item, index)=>{
      if(item.count > 0){
        this.validation.hasError = false;
        produtos.push(item);
      }
    });
    if(!this.validation.hasError){
      let params = {
        atividade: this.atividade,
        product: produtos,
      };
      this.atividadesProvider.saveConsumoOnApi(params, (result:any)=>{
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
        subTitle: 'Algo aconteceu que não era esperado',
        message: 'Preencha os campos do formulário corretamente para salvar no sistema.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}
