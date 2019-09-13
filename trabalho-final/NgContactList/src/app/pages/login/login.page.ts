import { Component } from '@angular/core';
import { InputType } from 'src/app/shared/const/input-type.const';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { BaseUtil } from 'src/app/shared/utils/base.util';
import { ServiceUtil } from 'src/app/shared/utils/service.util';
import { Result } from 'src/app/models/result.model';
import { RouteUtil } from 'src/app/shared/utils/route.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseUtil {

  public nameUsername: string = 'username';
  public namePassword: string = 'password';

  public passwordType: InputType = InputType.PASSWORD;

  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private navCtrl: NavController,
    loadingCtrl: LoadingController,
    toastCtrl: ToastController,
    alertCtrl: AlertController
  ) { 
    super(loadingCtrl, toastCtrl, alertCtrl);
    this.createFormGroup();
  }

  public createFormGroup(): void {
    this.form = this.fb.group({});
  }

  public async submit(): Promise<void> {
    this.showLoading('Autenticando...');

    const value = this.form.value;

    ServiceUtil.authUtil(
      this.service.auth(value),
      value,
      (res: Result) => {
        this.hideLoading();

        if (res.success) {
          this.showSuccess(res.message, 'Continuar', () => {
            RouteUtil.goToHome(this.navCtrl);
          });
        } else {
          this.showError(res.message, 'Fechar');
        }
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao autenticar', 'Fechar');
      }
    );
  }

}
