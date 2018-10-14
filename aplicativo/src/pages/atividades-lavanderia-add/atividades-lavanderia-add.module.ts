import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesLavanderiaAddPage } from './atividades-lavanderia-add';
import { AtividadesProvider } from '../../providers/atividades/atividades';

@NgModule({
  declarations: [
    AtividadesLavanderiaAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesLavanderiaAddPage),
  ],
  providers: [
    AtividadesProvider
  ]
})
export class AtividadesLavanderiaAddPageModule {}
