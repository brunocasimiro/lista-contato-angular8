import { CommonUtil } from '../utils/common.util';

export class InputType {

  static TEXT = new InputType('TEXT', 'Texto', 'text');
  static NUMBER = new InputType('NUMBER', 'Número', 'number');
  static PASSWORD = new InputType('PASSWORD', 'Senha', 'password');

  private constructor(
    private _key?: string,
    private _text?: string,
    private _value?: any,
  ) {}

  public static getByValue(value: string): InputType {
    value = CommonUtil.removeAccentuation(value);
    let returnValue = null;
    switch (value) {
      case InputType.TEXT.value:
        returnValue = InputType.TEXT;
        break;
      case InputType.NUMBER.value:
        returnValue = InputType.NUMBER;
        break;
      case InputType.PASSWORD.value:
        returnValue = InputType.PASSWORD;
        break;
    }
    return returnValue;
  }

  public static getByText(value: string): InputType {
    let returnValue = null;
    switch (value) {
      case InputType.TEXT.text:
        returnValue = InputType.TEXT;
        break;
      case InputType.NUMBER.text:
        returnValue = InputType.NUMBER;
        break;
      case InputType.PASSWORD.text:
        returnValue = InputType.PASSWORD;
        break;
    }
    return returnValue;
  }

  public static getTextByValue(value: string): string {
    const inputType = this.getByValue(value);
    return inputType ? inputType.text : '';
  }

  public static getValueByText(value: string): any {
    const inputType = this.getByText(value);
    return inputType ? inputType.value : null;
  }

  public static list(): InputType[] {
    return [InputType.TEXT, InputType.NUMBER, InputType.PASSWORD];
  }

  get text(): string {
    return this._text;
  }

  get value(): string {
    return this._value;
  }

  toString(): string {
    return this._key;
  }

}
