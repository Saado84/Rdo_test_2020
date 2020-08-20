import { Favoris } from '../Model/Favoris.model';
import { Subject } from 'rxjs'; 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



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
                if (list) {
                    this.favorisList = list.slice();
                } else {
                    return null; 
                }
                this.emitList();
            }
        );
    };



    deleteFavoris(name: string): Promise<Favoris> {
        return this.storage.get('favoris').then((list: Favoris[]) => {
            if(list && list.length) {

            let toKeep: Favoris[] = []; 

            for(let i of list) {
                if(i.name !== name){
                    toKeep.push(i); 
                }
            }
            return this.storage.set('favoris', toKeep); 
            
        }});  
    
    };

}