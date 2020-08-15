import { Menu } from '../Model/Menu.model';
import { Subject } from 'rxjs'; 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'


@Injectable()

export class MenuService {

    private menuList: Menu[] = [];
    menuList$ = new Subject<Menu[]>();

    constructor(private storage: Storage){}

    emitList(){
        this.menuList$.next(this.menuList)
    };


    addMenu(menu: Menu){
        this.menuList.push(menu);
        this.saveList();
        this.emitList(); 
    };


    saveList(){
        this.storage.set('menus', this.menuList);
    };
    

    fetchList(){
        this.storage.get('menus').then(
            (list) => {
                if (list) {
                    this.menuList = list.slice();
                } else {
                    return null; 
                }
                this.emitList();
            }
        );
    };



    deleteMenu(name: string): Promise<Menu> {
        return this.storage.get('menus').then((list: Menu[]) => {
            if(list && list.length) {

            let toKeep: Menu[] = []; 

            for(let i of list) {
                if(i.name !== name){
                    toKeep.push(i); 
                }
            }
            return this.storage.set('menus', toKeep); 
            
        }});  
    
    };

}