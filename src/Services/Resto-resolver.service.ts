import { RestoService } from '../Services/Resto.service';
import { Injectable } from '@angular/core'; 
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class RestoResolverService implements Resolve<any> {

  constructor(private dataService: RestoService){}

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    return this.dataService.getData(id); 
  }; 

}