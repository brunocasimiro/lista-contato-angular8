import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputType } from '../../const/input-type.const';
import { BaseUtil } from 'src/app/shared/utils/base.util';
import { EmailValidator } from 'src/app/validators/email.validator';

@Component({
  selector: 'ic-input-text',
  templateUrl: './input-text.component.html'
})
export class InputTextComponent extends BaseUtil implements OnInit, OnChanges {

  @Input() id: string;
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() disabled = false;
  @Input() value: any = null;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() maxlength = 60;
  @Input() minlength = 0;
  @Input() clazz: string;
  @Input() style: any;
  @Input() readOnly = false;
  @Input() type: InputType;
  @Input() mask: string = '*';
  @Input() emailValidate: boolean= false;

  nameDisabled = 'disabled';
  nameValue = 'value';
  nameReadOnly = 'readOnly';
  nameRequired = 'required';

  hide = false;
  password = null;

  constructor() {
    super(null, null, null);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onChangeInput(changes, this.nameDisabled, (currentValue?: any) => {
      this.nameDisabled ? this.disableField(this.form, this.name) : this.enableField(this.form, this.name);
    });
    this.onChangeInput(changes, this.nameValue, (currentValue?: any) => {
      this.setValueForm(this.form, this.name, currentValue);
    });
    this.onChangeInput(changes, this.nameReadOnly, (currentValue?: any) => {
      this.disabled = currentValue;
    });
    this.onChangeInput(changes, this.nameRequired, (currentValue?: any) => {
      this.setRequired(currentValue);
    });
  }

  ngOnInit(): void {
    if (!this.readOnly) {
      this.form.addControl(
        this.name,
        this.getFormControl()
      );
      if (this.required && !this.minlength) {
        this.minlength = 1;
      }
      this.setRequired(this.required);
    }
  }

  public getFormControl(): FormControl {
    return this.required
      ? new FormControl({value: this.value || null, disabled: this.disabled}, Validators.required)
      : new FormControl({value: this.value || null, disabled: this.disabled});
  }

  public setRequired(required: boolean): void {
    let validation = required ? [Validators.required, Validators.minLength(this.minlength)] : null;

    if (this.emailValidate) {
      if (!validation)
        validation = [];
      validation.push(EmailValidator.validator);
    }

    this.setValidationForm(this.form, this.name, validation);
  }

  public getType(): string {
    this.type = this.type ? this.type : InputType.TEXT;
    return this.type.value;
  }

  public changeType(): void {
    this.hide = !this.hide;
    this.type = this.hide ? InputType.PASSWORD : InputType.TEXT;
  }

  public isPassword(): boolean {
    const isTypePassword = this.equals(this.type, InputType.PASSWORD);
    if (this.password === null && isTypePassword) {
      this.password = true;
      this.hide = true;
    }
    return !(!this.password);
  }

  public getIdComponent(item: string): string {
    return this.getFieldId(this.name, item);
  }

  public isShowMessage(): boolean {
    return this.isInvalid(this.form, this.name);
  }

}
