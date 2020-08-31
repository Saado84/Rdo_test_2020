import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { PanierPageModule } from './panier/panier.module'; 
import { IonicStorageModule} from '@ionic/storage'; 
import { MenuService } from 'src/Services/Menu.service';
import { CommandesService } from 'src/Services/Commandes.service';
import { FavorisService } from 'src/Services/Favoris.service';
import { MapPageModule } from './map/map.module';
import { RestoService } from 'src/Services/Resto.service';
import { RestoResolverService } from 'src/Services/Resto-resolver.service';
import { MenusService } from 'src/Services/Menus.service'; 
import { MenusResolverService } from 'src/Services/Menus-resolver.service'; 
import { PopoverPageModule } from './popover/popover.module';
import { CallNumber } from '@ionic-native/call-number/ngx';  
import { NgPipesModule } from 'ngx-pipes';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule, AngularFireStorageModule, AngularFireAuthModule, AngularFirestoreModule,
    PanierPageModule,
    MapPageModule, 
    PopoverPageModule,
    NgPipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MenuService,
    CommandesService,
    FavorisService,
    RestoService, 
    RestoResolverService,
    MenusService,
    MenusResolverService,  
    CallNumber, 
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



