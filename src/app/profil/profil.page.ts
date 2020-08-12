import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  
})
export class ProfilPage implements OnInit {

  profil = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  }; 

  state: boolean = false;  

  constructor(
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router) { 

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.getUpdatedInfo(auth.uid);
      } 
    });
    
  }

  ngOnInit() {
  }

  onEdit() {
    this.state = true; 
    this.afAuth.authState.subscribe(auth => {

      if(auth) {
        this.getUpdatedInfo(auth.uid);
      }

    });
  }; 
  

  onSave() {
    this.state = false; 
    this.afAuth.authState.subscribe(auth => {
 
      if(auth){ 
        this.updateUserInfo(auth.uid);
      }

    });
  };


  updateUserInfo(userId: string){

    this.afDatabase.object('Users/' + userId).set({
      firstName: this.profil.firstName,
      lastName: this.profil.lastName,
      email: this.profil.email,
      mobile: this.profil.mobile
    })
  };

  getUpdatedInfo(userId: string){

    this.afDatabase.object('Users/' + userId).snapshotChanges().subscribe(action => {
      this.profil.firstName = action.payload.exportVal().firstName;
      this.profil.lastName = action.payload.exportVal().lastName;
      this.profil.email = action.payload.exportVal().email;
      this.profil.mobile = action.payload.exportVal().mobile
    }); 
  };

}


