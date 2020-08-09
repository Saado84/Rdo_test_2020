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
                if (list && list.length) {
                    this.menuList = list.slice();
                }
                this.emitList();
            }
        );
    };


}