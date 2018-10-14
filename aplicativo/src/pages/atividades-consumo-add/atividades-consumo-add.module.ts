import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesConsumoAddPage } from './atividades-consumo-add';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { AtividadesProvider } from '../../providers/atividades/atividades';

@NgModule({
  declarations: [
    AtividadesConsumoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesConsumoAddPage),
  ],
  providers: [
    ProdutosProvider,
    AtividadesProvider
  ]
})
export class AtividadesConsumoAddPageModule {}
