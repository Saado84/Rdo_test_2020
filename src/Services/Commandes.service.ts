import { Menu } from '../Model/Menu.model';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'


@Injectable()

export class CommandesService {

    
    constructor(private storage: Storage){}

    addCommande(commande: Menu): Promise<any> {
        return this.storage.get('commandes').then((list: Menu[]) => {
            if(list) {
                list.push(commande); 
                return this.storage.set('commandes', list);
            } else {
                return this.storage.set('commandes', [commande]); 
            }
        });
    }; 


    getCommandes(): Promise<Menu[]> {
        return this.storage.get('commandes'); 
    };


    deleteCommande(name: string): Promise<Menu> {
        return this.storage.get('commandes').then((list: Menu[]) => {
            if(!list || list.length === 0) {
                return null; 
            }

            let toKeep: Menu[] = []; 

            for(let i of list) {
                if(i.name !== name){
                    toKeep.push(i); 
                }
            }
            return this.storage.set('commandes', toKeep); 
        });
    };
    





}