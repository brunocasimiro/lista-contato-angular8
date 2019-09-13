import { CanActivate } from '@angular/router';
import { UserUtil } from '../shared/utils/user.util';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private navCtrl: NavController
    ) { }

    public canActivate() : boolean {
        const user = UserUtil.get();

        if(!user) {
            this.navCtrl.navigateRoot('/login');
            return false;
        }
        
        return true;
    }
}