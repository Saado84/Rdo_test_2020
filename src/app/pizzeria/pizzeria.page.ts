import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.page.html',
  styleUrls: ['./pizzeria.page.scss'],
})
export class PizzeriaPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onBack(){
    this.navCtrl.navigateBack('/')
  };

}
