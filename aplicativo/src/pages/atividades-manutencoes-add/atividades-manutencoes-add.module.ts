import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesManutencoesAddPage } from './atividades-manutencoes-add';
import { AtividadesProvider } from '../../providers/atividades/atividades';

@NgModule({
  declarations: [
    AtividadesManutencoesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesManutencoesAddPage),
  ],
  providers: [
    AtividadesProvider
  ]
})
export class AtividadesManutencoesAddPageModule {}
