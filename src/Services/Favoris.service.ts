import { Favoris } from '../Model/Favoris.model';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()

export class FavorisService {


    constructor(private storage: Storage){}



    addFavoris(favoris: Favoris): Promise<any> {
        return this.storage.get('favoris').then((list: Favoris[]) => {
            if(list) {
                list.push(favoris); 
                return this.storage.set('favoris', list);
            } else {
                return this.storage.set('favoris', [favoris]); 
            }
        });
    }; 


    getFavoris(): Promise<Favoris[]> {
        return this.storage.get('favoris'); 
    };
    
    
    // le fonctionnement de cette fonction est à revoir !!
    

    deleteFavoris(name: string): Promise<Favoris> {
        return this.storage.get('favoris').then((list: Favoris[]) => {
            if(!list || list.length === 0) {
                return null; 
            }

            let toKeep: Favoris[] = []; 

            for(let i of list) {
                if(i.name !== name){
                    toKeep.push(i); 
                }
            }
            return this.storage.set('favoris', toKeep); 
        });
    };



}