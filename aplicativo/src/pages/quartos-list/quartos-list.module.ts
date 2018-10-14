import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuartosListPage } from './quartos-list';
import { QuartosProvider } from '../../providers/quartos/quartos';

@NgModule({
  declarations: [
    QuartosListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuartosListPage),
  ],
  providers: [
    QuartosProvider
  ]
})
export class QuartosListPageModule {}
