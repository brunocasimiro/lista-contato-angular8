import { FormControl } from '@angular/forms';

export class EmailValidator {
    constructor() { }

    static validator(control: FormControl) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(control.value)) {
            return { 'E-mail inválido': true };
        }

        return null;
    }
}