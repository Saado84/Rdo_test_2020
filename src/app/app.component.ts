import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import{ Router } from '@angular/router'; 
import { AngularFireAuth } from '@angular/fire/auth'; 





@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth, 
    private router: Router

  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        if(!auth) {
          this.router.navigateByUrl('/login');
        } else {
          this.router.navigateByUrl('/');
        }
      }); 
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }; 

  
  onProfil(){
    this.afAuth.authState.subscribe(auth => {
      if(!auth) {
        this.router.navigateByUrl('/login');
      }
    });
    this.router.navigateByUrl('/profil');  
  }; 
  
  onCommande(){
    this.afAuth.authState.subscribe(auth => {
      if(!auth) {
        this.router.navigateByUrl('/login');
      } 
    });
    this.router.navigateByUrl('/commandes'); 
  }; 

  logOut(){
    this.afAuth.auth.signOut();   
  }; 

  onApropos(){
    this.afAuth.authState.subscribe(auth => {
      if(!auth) {
        this.router.navigateByUrl('/login');
      } 
    });
    this.router.navigateByUrl('/apropos'); 
  };

}
