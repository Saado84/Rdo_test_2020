import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { Router }from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = {
    email: '',
    password: ''
  }; 

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router) { }

  ngOnInit() {
  }


  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth => {
      console.log('utilisateur connecté: ' + auth.user.uid);
    })
    .catch(error => {
      console.log('utilisateur non connecté!: ' + error); 
    }); 
  }; 


  signUp(){
    this.router.navigateByUrl('/signup')
  }; 

}
