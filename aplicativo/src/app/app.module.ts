import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CamareirasListPage } from '../pages/camareiras-list/camareiras-list';
import { CamareirasProvider } from '../providers/camareiras/camareiras';
import { HttpClientModule } from '@angular/common/http';
import { CamareiraViewPage } from '../pages/camareira-view/camareira-view';
import { CamareiraAddPage } from '../pages/camareira-add/camareira-add';
import { QuartosProvider } from '../providers/quartos/quartos';
import { QuartosListPage } from '../pages/quartos-list/quartos-list';
import { QuartosViewPage } from '../pages/quartos-view/quartos-view';
import { QuartosAddPage } from '../pages/quartos-add/quartos-add';
import { AtividadesProvider } from '../providers/atividades/atividades';
import { AtividadesListPage } from '../pages/atividades-list/atividades-list';
import { AtividadesViewPage } from '../pages/atividades-view/atividades-view';
import { AtividadesAddPage } from '../pages/atividades-add/atividades-add';
import { ServicosProvider } from '../providers/servicos/servicos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CamareirasListPage,
    CamareiraViewPage,
    CamareiraAddPage,
    QuartosListPage,
    QuartosViewPage,
    QuartosAddPage,
    AtividadesListPage,
    AtividadesViewPage,
    AtividadesAddPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CamareirasListPage,
    CamareiraViewPage,
    CamareiraAddPage,
    QuartosListPage,
    QuartosViewPage,
    QuartosAddPage,
    AtividadesListPage,
    AtividadesViewPage,
    AtividadesAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CamareirasProvider,
    HttpClientModule,
    QuartosProvider,
    AtividadesProvider,
    ServicosProvider
  ]
})
export class AppModule {}
