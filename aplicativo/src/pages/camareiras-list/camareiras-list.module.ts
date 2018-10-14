import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamareirasListPage } from './camareiras-list';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';

@NgModule({
  declarations: [
    CamareirasListPage,
  ],
  imports: [
    IonicPageModule.forChild(CamareirasListPage),
  ],
  providers: [
    CamareirasProvider
  ]
})
export class CamareirasListPageModule {}
