import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms'; 
import { NavController} from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
 

  constructor(
    public afAuth: AngularFireAuth, 
    public afDB: AngularFireDatabase,
    public navCtrl: NavController) { }


  onSubmit(form: NgForm) {

    const firstName = form.value['firstName']; 
    const lastName = form.value['lastName'];
    const email = form.value['email'];
    const password = form.value['password'];
    const mobile = form.value['mobile']; 

    this.signUp(firstName, lastName, email, password, mobile)

  }

  signUp(nom: string, prénom: string, mail: string, motDePasse: string, tel: string){
    
    this.afAuth.auth.createUserWithEmailAndPassword(mail, motDePasse)
    .then(auth => {
      console.log('utilisateur connecté; ' + auth.user.uid);
      this.createUserInfo(auth.user.uid, nom, prénom, mail, tel); 
    })
    .catch(error => {
      console.log('utilsateur non connecté!: '+ error); 
    }); 
  }; 


  createUserInfo(userId: string, nom: string, prénom: string, mail: string, tel: string){
    
    this.afDB.object('Users/' + userId).set({
      firstName: nom, 
      lastName: prénom,
      email: mail,
      mobile: tel
    })
  }; 


  onBack(){
    this.navCtrl.navigateBack('/login')
  }; 

}
