import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { RouteUtil } from 'src/app/shared/utils/route.util';
import { ServiceUtil } from 'src/app/shared/utils/service.util';
import { DataService } from 'src/app/data.service';
import { Result } from 'src/app/models/result.model';
import { BaseUtil } from 'src/app/shared/utils/base.util';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent extends BaseUtil implements OnInit {
  @Input() contacts: Contact[] = [];
  @Input() filterText: string;

  constructor(
    private navCtrl: NavController,
    private service: DataService,
    loadingCtrl: LoadingController,
    toastCtrl: ToastController,
    alertCtrl: AlertController
  ) { 
    super(loadingCtrl, toastCtrl, alertCtrl);
  }

  ngOnInit() {}

  public addContact(): void {
    RouteUtil.goToInsertContact(this.navCtrl);
  }

  public edit(contact: Contact): void {
    RouteUtil.goToEditContact(contact.id, this.navCtrl);
  }

  public async remove(contact: Contact): Promise<void> {
    await this.showLoading('Removendo contato...');

    ServiceUtil.removeContactUtil(
      this.service.removeContact(contact),
      contact,
      (res: Result) => {
        this.removeFromList(contact);
        this.hideLoading();
        this.showSuccess(res.message, 'Continuar');
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao remover', 'Fechar');
      }
    );
  }

  public removeFromList(contact: Contact): void {
    const index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }

}
