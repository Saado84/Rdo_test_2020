import { Menu } from '../Model/Menu.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'


@Injectable()

export class CommandesService {

    private commandesList: Menu[] = [];
    commandesList$ = new Subject<Menu[]>();

    constructor(private storage: Storage){}
    

    emitList(){
        this.commandesList$.next(this.commandesList)
    };


    addCommande(commande: Menu){
        this.commandesList.push(commande);
        this.saveList();
        this.emitList(); 
    };


    saveList(){
        this.storage.set('commandes', this.commandesList);
    };


    fetchList(){
        this.storage.get('commandes').then(
            (list) => {
                if (list && list.length) {
                    this.commandesList = list.slice();
                }
                this.emitList();
            }
        );
    };



}