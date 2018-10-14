import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesListPage } from './atividades-list';
import { AtividadesProvider } from '../../providers/atividades/atividades';

@NgModule({
  declarations: [
    AtividadesListPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesListPage),
  ],
  providers: [
    AtividadesProvider
  ]
})
export class AtividadesListPageModule {}
