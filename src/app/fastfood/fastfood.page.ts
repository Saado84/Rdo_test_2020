import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RestoService } from 'src/Services/Resto.service';
import { LoadingController, NavController } from '@ionic/angular';




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
    private loadingController: LoadingController) { 
  
    this.loadFastFoods(); 
    this.fastFoodSubscription = this.fastFoods.subscribe(
      (value: any[]) => {
        this.fastFoodList = value;
      }
    ); 
    this.onLoadPage(); 
  };

  onSendMenus(index: number) {
    this.RestoService.setData('menus', this.fastFoodList[index]); 
    this.router.navigateByUrl('/abracadabrasy/menus')
  }; 

  loadFastFoods() {
    this.fastFoods = this.fireStore.collection('FastFood').valueChanges();   
  };


  async onLoadPage(){
    const loading = await this.loadingController.create({
      message: 'Veuillez patienter...',
      duration: 300
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }; 

  onBack(){
    this.navCtrl.navigateBack('/')
  }


}
