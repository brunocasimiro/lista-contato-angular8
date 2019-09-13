export class Constants {

  /**
   * Sistema
   */
  // Mensagem
  static readonly MSG_REQUIRED_FIELD = 'Campo Obrigatório';

  static getText(text: string, variables?: any[]): string {
    variables = variables ? variables : [];
    variables.forEach((variable, index) => {
      text = text.replace(`{${index}}`, variable + '');
    });
    return text;
  }

}
