import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamareiraViewPage } from './camareira-view';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';

@NgModule({
  declarations: [
    CamareiraViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CamareiraViewPage),
  ],
  providers: [
    CamareirasProvider
  ]
})
export class CamareiraViewPageModule {}
