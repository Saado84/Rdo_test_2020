import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',  

  }; 

 

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase) { }

  ngOnInit() {
  }; 

  signUp(){
    
    this.afAuth.auth.createUserWithEmailAndPassword(this.signUpData.email, this.signUpData.password)
    .then(auth => {
      console.log('utilisateur connecté; ' + auth.user.uid);
      this.createUserInfo(auth.user.uid)
    })
    .catch(error => {
      console.log('utilsateur non connecté!: '+ error); 
    }); 
  }; 

  createUserInfo(userId: string){
    this.afDB.object('Users/' + userId).set({
      firstName: this.signUpData.firstName, 
      lastName: this.signUpData.lastName,
      email: this.signUpData.email,
      mobile: this.signUpData.mobile
    })
  }; 

}
