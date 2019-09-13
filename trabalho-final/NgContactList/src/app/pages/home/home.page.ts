import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';
import { Result } from 'src/app/models/result.model';
import { ServiceUtil } from 'src/app/shared/utils/service.util';
import { BaseUtil } from 'src/app/shared/utils/base.util';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseUtil {
  public contacts: Contact[];
  public filterText: string;

  constructor(
    private service: DataService,
    loadingCtrl: LoadingController,
    toastCtrl: ToastController
  ) { 
    super(loadingCtrl, toastCtrl, null);
  }

  ngOnInit() {
    ServiceUtil.getContactsUtil(
      this.service.getContacts(),
      (res: Result) => {
        this.contacts = res.data;
      },
      (err: any) => {
        this.showError('Falha ao carregar os contatos', 'Fechar');
      }
    );
  }

}
