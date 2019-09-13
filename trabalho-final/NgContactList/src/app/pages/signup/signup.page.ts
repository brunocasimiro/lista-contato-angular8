import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputType } from 'src/app/shared/const/input-type.const';
import { BaseUtil } from 'src/app/shared/utils/base.util';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { RouteUtil } from 'src/app/shared/utils/route.util';
import { User } from 'src/app/models/user.model';
import { Result } from 'src/app/models/result.model';
import { ServiceUtil } from 'src/app/shared/utils/service.util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends BaseUtil {
  
  public nameName: string = 'name';
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
    await this.showLoading('Criando...');

    const value = this.getFormUser();

    ServiceUtil.createCustomerUtil(
      this.service.createCustomer(value),
      value,
      (res: Result) => {
        this.hideLoading();
        this.showSuccess(res.message, 'Continuar', () => {
          RouteUtil.goToLogin(this.navCtrl);
        });
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao cadastrar', 'Fechar');
      }
    );
  }

  private getFormUser(): User {
    return this.form.value;
  }

}
