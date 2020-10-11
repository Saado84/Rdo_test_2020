import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


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

  onSubmit(form: NgForm){

    const firstName = form.value['firstName']; 
    const lastName = form.value['lastName'];
    const email = form.value['email']; 
    const mobile = form.value['mobile']; 

    this.onSave(firstName, lastName, email, mobile)
  }
  

  onSave(nom: string, prénom: string, mail: string, tel: string) {
    this.state = false; 
    this.afAuth.authState.subscribe(auth => {
 
      if(auth){ 
        this.updateUserInfo(auth.uid, nom, prénom, mail, tel);
      }

    });
  };


  updateUserInfo(userId: string, nom: string, prénom: string, mail: string, tel: string){

    this.afDatabase.object('Users/' + userId).set({
      firstName: nom,
      lastName: prénom,
      email: mail,
      mobile: tel
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


