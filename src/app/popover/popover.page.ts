import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  value = null; 
  

  horaires= null; 

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.horaires = this.navParams.get('custom_id'); 

  }

}
