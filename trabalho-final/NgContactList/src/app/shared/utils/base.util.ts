import { SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { CommonUtil } from './common.util';
import { Constants } from '../const/text-const';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

export class BaseUtil {

  private readonly _loadingCtrl: LoadingController;
  private readonly _toastCtrl: ToastController;
  private readonly _alertCtrl: AlertController;

  private _loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {
    this._loadingCtrl = loadingCtrl;
    this._toastCtrl = toastCtrl;
    this._alertCtrl = alertCtrl;
  }

  public async showLoading(message: string): Promise<any> {
    if (this._loadingCtrl) {
      this._loading = await this._loadingCtrl.create({ message: message });
      this._loading.present();
    }
  }

  public async hideLoading(): Promise<any> {
    if (this._loading) {
      this._loading.dismiss();
    }
  }

  public async showError(message: string, buttonText: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: buttonText
    });
    toast.present();
  }

  public async showSuccess(message: string, buttonText: string, callback: () => void = null): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{
        text: buttonText,
        handler: () => {
          if (callback)
            callback();
        }
      }]
    });

    await alert.present();
  }

  public onChangeInput(changes: SimpleChanges, name: string, next: (currentValue?: any) => void): void {
    const keyChanges = Object.keys(changes);
    if (this.contains(keyChanges, name)) {
      next(changes[name].currentValue);
    }
  }

  public enableField(form: FormGroup, fieldName: string): void {
    const field = this.getControl(form, fieldName);
    if (!CommonUtil.isEmpty(field)) {
      field.enable();
    }
  }

  public disableField(form: FormGroup, fieldName: string): void {
    const field = this.getControl(form, fieldName);
    if (!CommonUtil.isEmpty(field)) {
      field.disable();
    }
  }

  public getValueForm(form: FormGroup, fieldName: string): any {
    const field = this.getControl(form, fieldName);
    return !CommonUtil.isEmpty(field) ? field.value : null;
  }

  public setValueForm(form: FormGroup, fieldName: string, value: any): void {
    const field = this.getControl(form, fieldName);
    if (!CommonUtil.isEmpty(field)) {
      field.setValue(value);
    }
  }

  public setValidationForm(form: FormGroup, fieldName: string, validations: any[]): void {
    if (!form.get(fieldName)) {
      return;
    }
    if (CommonUtil.isEmpty(!validations)) {
      form.get(fieldName).setValidators(validations);
    } else {
      form.get(fieldName).clearValidators();
    }
    form.get(fieldName).updateValueAndValidity();
  }

  public getControl(form: FormGroup, fieldName: string): AbstractControl {
    if (!CommonUtil.isEmpty(form)) {
      const field: AbstractControl = form.get(fieldName);
      return CommonUtil.isEmpty(field) ? null : field;
    }
    return null;
  }

  public getFieldId(name: string, item: string): string {
    return this.getId([item, name], '_');
  }

  public getId(ids: string[], concat?: string): string {
    const id = this.concatStr(ids, concat);
    return id ? id : '';
  }

  public isInvalid(form: FormGroup, fieldName: string): boolean {
    var field = this.getControl(form, fieldName);
    if (!CommonUtil.isEmpty(field)) {
      return field.invalid && !field.pristine;
    }
    return false;
  }

  public getClone(object: any): any {
    return JSON.parse(JSON.stringify(object));
  }

  public getCloneForm(form: FormGroup): any {
    return this.getClone(this.convertFormToObj(form));
  }

  public convertFormToObj(form: FormGroup): any {
    const newObject = {};
    Object.keys(form.controls).forEach(control => {
      newObject[control] = this.getValueForm(form, control);
    });
    return newObject;
  }

  public instantiateObject(object: any): any {
    const newObject = {};
    Object.keys(object).forEach(key => {
      newObject[key] = object[key] ? object[key] : null;
    });
    return newObject;
  }

  public instantiateForm(form: FormGroup, object: any): any {
    const newObject = {};
    const objectKeys = Object.keys(this.instantiateObject(object));
    const formValueKeys = Object.keys(this.getCloneForm(form));

    formValueKeys.forEach(formKey => {
      let find = false;
      for (let index = 0; index < objectKeys.length; index++) {
        const key = objectKeys[index];
        if (key === formKey) {
          newObject[formKey] = object[key];
          find = true;
          break;
        }
      }
      if (!find) {
        newObject[formKey] = null;
      }
    });
    return newObject;
  }

  public concatStr(values: string[], concat?: string, attribute?: string): string {
    concat = concat ? concat : '';
    let newValue = '';
    values.forEach(value => {
      let arrayValue = value;
      if (attribute) {
        arrayValue = value[attribute];
      }
      newValue += arrayValue + concat;
    });
    return newValue.substring(0, newValue.length - concat.length);
  }

  public contains(list: any[], value?: any, lambda?: (x: any) => boolean): boolean {
    let index = -1;
    if (lambda) {
      index = list.findIndex(lambda);
    } else {
      index = list.findIndex(x => this.equals(x, value));
    }
    return index !== -1;
  }

  public equals(objectA: any, objectB: any): boolean {
    if (typeof objectA !== typeof objectB) {
      return false;
    }
    if (objectA === null && objectB === null) {
      return true;
    }
    if (objectA === undefined && objectB === undefined) {
      return true;
    }
    const aKeys = objectA !== null && typeof objectA !== 'string' ? Object.keys(objectA) : [],
          bKeys = objectB !== null && typeof objectB !== 'string' ? Object.keys(objectB) : [];
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    if (aKeys.length === 0) {
      return (objectA === objectB
          || (typeof objectA === 'object' || typeof objectB === 'object'));
    }
    const areDifferent = aKeys.some((key) => {
      return !this.equals(objectA[key], objectB[key]);
    });
    return !areDifferent;
  }

  /**
   * Constantes
   */

  public msgRequiredField(): string {
    return Constants.MSG_REQUIRED_FIELD;
  }
  
}