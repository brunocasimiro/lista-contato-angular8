import { Result } from '../../models/result.model';
import { DatabaseUtil } from './database.util';
import { UserUtil } from './user.util';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/data.service';

// Classe para simular validações e banco de dados
export class ServiceUtil {

  public static createCustomerUtil(
    promise: any, 
    value: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    promise.subscribe(
        (res: Result) => { 
          DatabaseUtil.insertUser(value);

          if(successCallback)
            successCallback(res);
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

  public static authUtil(
    promise: any, 
    value: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    let isValid = false;

    const users = DatabaseUtil.selectUsers();
    let dataUser = new User();

    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if (user.username === value.username
      && user.password === value.password) {
        dataUser = user;
        isValid = true;
        break;
      }
    }

    promise.subscribe(
        (res: Result) => {
          if (isValid) {
            dataUser.token = res.data.token;
            dataUser.password = null;
            UserUtil.set(dataUser);
          
            if(successCallback) {
              res.message = `Bem-vindo ${dataUser.name}`;
              res.data.name = dataUser.name;
              res.data.username = dataUser.username;
              successCallback(res);
            }
          } else if (successCallback) {
            res.success = false;
            res.message = "Usuário não cadastrado ou dados informados inválidos!";
            successCallback(res);
          }
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

  public static resetPasswordUtil(
    service: DataService,
    promise: any, 
    user: any,
    newPassword: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    this.authUtil(
      service.auth(user),
      user,
      (res: Result) => {
        if (res.success) {
          promise.subscribe(
            (res: Result) => { 
              DatabaseUtil.updateUser(user, newPassword);

              if(successCallback)
                successCallback(res);
            },
            (err: any) => { 
              if (errorCallback)
                errorCallback(err);
            }
          );
        } else {
          res.message = 'Senha atual inválida!';
          if (successCallback)
            successCallback(res);
        }
      },
      (err: any) => {
        if (errorCallback)
          errorCallback(err);
      }
    );
  }

  public static createContactUtil(
    promise: any, 
    value: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    promise.subscribe(
        (res: Result) => { 
          DatabaseUtil.insertContact(value);

          if(successCallback)
            successCallback(res);
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

  public static removeContactUtil(
    promise: any, 
    value: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    promise.subscribe(
        (res: Result) => { 
          DatabaseUtil.removeContact(value);

          if(successCallback)
            successCallback(res);
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

  public static updateContactUtil(
    promise: any, 
    value: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    promise.subscribe(
        (res: Result) => { 
          DatabaseUtil.updateContact(value);

          if(successCallback)
            successCallback(res);
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

  public static getContactsUtil(
    promise: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    promise.subscribe(
        (res: Result) => { 
          res.data = DatabaseUtil.selectContacts();

          if(successCallback)
            successCallback(res);
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

  public static getContactUtil(
    promise: any, 
    value: any,
    successCallback: (res: Result) => void = null, 
    errorCallback: (err: any) => void = null
  ): void {
    promise.subscribe(
        (res: Result) => { 
          res.data = DatabaseUtil.selectContact(value);

          if(successCallback)
            successCallback(res);
        },
        (err: any) => { 
          if (errorCallback)
            errorCallback(err);
        }
      );
  }

}