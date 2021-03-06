import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesViewPage } from './atividades-view';
import { AtividadesProvider } from '../../providers/atividades/atividades';

@NgModule({
  declarations: [
    AtividadesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesViewPage),
  ],
  providers: [
    AtividadesProvider
  ]
})
export class AtividadesViewPageModule {}
