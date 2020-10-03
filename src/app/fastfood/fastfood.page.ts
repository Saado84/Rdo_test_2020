import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RestoService } from 'src/Services/Resto.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';




@Component({
  selector: 'app-fastfood',
  templateUrl: './fastfood.page.html',
  styleUrls: ['./fastfood.page.scss'],
})

export class FastfoodPage  {
  
  fastFoods: Observable<any[]>; 

  fastFoodSubscription: Subscription; 

  fastFoodList: any[]; 


  constructor(
    private fireStore: AngularFirestore, 
    private router: Router, 
    public navCtrl: NavController, 
    private RestoService : RestoService,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController) { 
  
    this.loadFastFoods(); 
  };
 
  async loadFastFoods() {
    const loading = await this.loadCtrl.create({
      message: 'Veuillez patienter...',
  
    });
    await loading.present().then(() => {
      loading.dismiss(); 

      this.fastFoods = this.fireStore.collection('FastFood').valueChanges(); 
      this.fastFoodSubscription = this.fastFoods.subscribe(
        (value: any[]) => {
          this.fastFoodList = value;
        }
      );
    }).catch(() => {
      loading.dismiss(); 
      this.presentToast(); 
    }); 

  };


  // checker après le build lors des tests l'affichage du toast si erreur ou absence de connexion //
  // si non revoir le bloc de code //

  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: "Impossible d'afficher la liste !", 
      duration: 2500,
      position: "bottom"
    }); 
    toast.present(); 
  };


  onSendMenus(index: number) {
    this.RestoService.setData('menus', this.fastFoodList[index]); 
    this.router.navigateByUrl('/abracadabrasy/menus')
  };


  onBack(){
    this.navCtrl.navigateBack('/')
  }; 


}
