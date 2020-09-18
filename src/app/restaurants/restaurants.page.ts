import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onBack(){
    this.navCtrl.navigateBack('/')
  };

}
