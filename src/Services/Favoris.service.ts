import { Favoris } from '../Model/Favoris.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'



@Injectable()

export class FavorisService {

    private favorisList: Favoris[] = [];
    favorisList$ = new Subject<Favoris[]>();

    constructor(private storage: Storage){}

    emitList(){
        this.favorisList$.next(this.favorisList)
    };


    addFavoris(favoris: Favoris){
        this.favorisList.push(favoris);
        this.saveList();
        this.emitList(); 
    };


    saveList(){
        this.storage.set('favoris', this.favorisList);
    };


    fetchList(){
        this.storage.get('favoris').then(
            (list) => {
                if (list && list.length) {
                    this.favorisList = list.slice();
                }
                this.emitList();
            }
        );
    };

    
    // le fonctionnement de cette fonction est à revoir !!
    
    deleteFavoris(index: number){

      this.storage.get('favoris').then(
        (list) => {
            if (!list && list.length === 0) {
                return null; 
            }; 

            let toKeep: Favoris[] = [];
              for (let i of list) {
                  if (i.name !== this.favorisList[index].name) {
                        toKeep.push(i);
                    };
                    console.log(i.name); 
                };
                return this.storage.set('favoris', toKeep);
        });
    };
         
    

}