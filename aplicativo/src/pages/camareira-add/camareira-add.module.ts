import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamareiraAddPage } from './camareira-add';
import { CamareirasProvider } from '../../providers/camareiras/camareiras';

@NgModule({
  declarations: [
    CamareiraAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CamareiraAddPage),
  ],
  providers: [
    CamareirasProvider
  ]
})
export class CamareiraAddPageModule {}
