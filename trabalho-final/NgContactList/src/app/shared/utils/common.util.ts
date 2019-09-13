export class CommonUtil {

  public static isDefined(dado: any): boolean {
    return (dado) && (dado !== 'undefined') && (dado !== 'null');
  }

  public static isBlank(dado: any): boolean {
    const text: string = dado + '';
    return !text.length || !text.trim().length;
  }

  public static isEmpty(dado: any): boolean {
    return (!this.isDefined(dado)) || (this.isBlank(dado));
  }

  public static removeAccentuation(text: string): string {
    if (text !== undefined) {
      const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
      const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
      const p = new RegExp(a.split('').join('|'), 'g')
      return text.toString().toLowerCase().trim()
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, '-and-')
        .replace(/[\s\W-]+/g, '-');
    } else {
      return text;
    }
  }

}