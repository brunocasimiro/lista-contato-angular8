import { NavController } from '@ionic/angular';

export class RouteUtil {

  public static goToLogin(navCtrl: NavController): void {
    navCtrl.navigateRoot('/login');
  }

  public static goToHome(navCtrl: NavController): void {
    navCtrl.navigateRoot('/');
  }

  public static goToInsertContact(navCtrl: NavController): void {
    navCtrl.navigateRoot('/contact');
  }

  public static goToEditContact(id: number, navCtrl: NavController): void {
    navCtrl.navigateRoot(`/contact/${id}`);
  }

}