import { Component } from '@angular/core';
import { UserUtil } from 'src/app/shared/utils/user.util';
import { NavController } from '@ionic/angular';
import { RouteUtil } from 'src/app/shared/utils/route.util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(
    private navCtrl: NavController
  ) { }

  public logout(): void {
    UserUtil.clear();
    RouteUtil.goToLogin(this.navCtrl);
  }

}
