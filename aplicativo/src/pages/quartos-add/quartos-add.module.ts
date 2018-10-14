import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuartosAddPage } from './quartos-add';
import { QuartosProvider } from '../../providers/quartos/quartos';

@NgModule({
  declarations: [
    QuartosAddPage,
  ],
  imports: [
    IonicPageModule.forChild(QuartosAddPage),
  ],
  providers: [
    QuartosProvider
  ]
})
export class QuartosAddPageModule {}
