import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadesAddPage } from './atividades-add';
import { AtividadesProvider } from '../../providers/atividades/atividades';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';
import { QuartosProvider } from '../../providers/quartos/quartos';
import { ServicosProvider } from '../../providers/servicos/servicos';

@NgModule({
  declarations: [
    AtividadesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadesAddPage),
  ],
  providers: [
    AtividadesProvider,
    CamareirasProvider,
    QuartosProvider,
    ServicosProvider
  ]
})
export class AtividadesAddPageModule {}
