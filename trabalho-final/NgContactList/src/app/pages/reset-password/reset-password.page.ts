import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserUtil } from 'src/app/shared/utils/user.util';
import { InputType } from 'src/app/shared/const/input-type.const';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { BaseUtil } from 'src/app/shared/utils/base.util';
import { ServiceUtil } from 'src/app/shared/utils/service.util';
import { Result } from 'src/app/models/result.model';
import { promise } from 'protractor';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage extends BaseUtil implements OnInit {
  public user: User;

  public nameOldPassword: string = 'oldPassword';
  public nameNewPassword: string = 'newPassword';
  public nameConfirmPassword: string = 'confirmPassword';

  public passwordType: InputType = InputType.PASSWORD;

  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private service: DataService,
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

  ngOnInit() {
    this.user = UserUtil.get();
  }

  public async submit(): Promise<void> {
    await this.showLoading('Salvando...');

    if (!this.validateNewPassword()) {
      this.showError('A confirmação da senha deve ser igual a nova senha!', 'Fechar');
      this.hideLoading();
      return;
    }
    
    const value = this.form.value;

    const userLogin = new User(
      this.user.name,
      this.user.username,
      value.oldPassword
    );

    ServiceUtil.resetPasswordUtil(
      this.service,
      this.service.resetPassword(value),
      userLogin,
      value.newPassword,
      (res: Result) => {
        this.hideLoading();

        if (res.success) {
          this.form.reset();
          this.showSuccess(res.message, 'Ok');
        } else {
          this.showError(res.message, 'Fechar');
        }
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao resetar a senha!', 'Fechar');
      }
    );
  }

  private validateNewPassword(): boolean {
    const newPassword = this.getValueForm(this.form, this.nameNewPassword);
    const confirmPassword = this.getValueForm(this.form, this.nameConfirmPassword);

    return newPassword === confirmPassword;
  }

}
