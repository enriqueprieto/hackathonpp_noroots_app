import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesViewPage } from './atividades-view';

@NgModule({
  declarations: [
    AtividadesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesViewPage),
  ]
})
export class AtividadesViewPageModule {}
