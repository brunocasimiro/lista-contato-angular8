import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseUtil } from 'src/app/shared/utils/base.util';
import { ServiceUtil } from 'src/app/shared/utils/service.util';
import { Result } from 'src/app/models/result.model';
import { RouteUtil } from 'src/app/shared/utils/route.util';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.page.html',
  styleUrls: ['./contact-editor.page.scss'],
})
export class ContactEditorPage extends BaseUtil implements OnInit {

  public contact: Contact;

  public form: FormGroup;
  public isEdit: boolean = false;
  public id: number;
  public title: string = 'Inserir Novo Contato'

  public nameName: string = 'name';
  public nameEmail: string = 'email';
  public nameCpf: string = 'cpf';
  public namePhone: string = 'phone';
  public address: string = 'address';

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
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
    let id = this.route.snapshot.paramMap.get('contact');
    
    if (id) {
      this.id = Number.parseInt(id);
      this.isEdit = true;
      this.title = 'Editar contato';
      this.getContact(this.id);
    }
  }

  public async getContact(id: number): Promise<void> {
    await this.showLoading('Carregando contato');

    ServiceUtil.getContactUtil(
      this.service.getContact(id),
      id,
      (res: Result) => {
        this.hideLoading();
        if (res.data)
          this.form.setValue(this.instantiateForm(this.form, res.data));
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao carregar contato', 'Fechar'); 
      }
    );
  }

  public async submit(): Promise<void> {
    if (!this.isEdit) {
      this.save();
    } else {
      this.edit();
    }
  }

  public async save(): Promise<void> {
    await this.showLoading('Criando...');

    const value = this.getFormContact();

    ServiceUtil.createContactUtil(
      this.service.createContact(value),
      value,
      (res: Result) => {
        this.hideLoading();
        this.showSuccess(res.message, 'Continuar', () => {
          RouteUtil.goToHome(this.navCtrl);
        });
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao cadastrar', 'Fechar');
      }
    );
  }

  public async edit(): Promise<void> {
    await this.showLoading('Alterando...');

    const value = this.getFormContact();

    ServiceUtil.updateContactUtil(
      this.service.updateContact(value),
      value,
      (res: Result) => {
        this.hideLoading();
        this.showSuccess(res.message, 'Continuar', () => {
          RouteUtil.goToHome(this.navCtrl);
        });
      },
      (err: any) => {
        this.hideLoading();
        this.showError('Falha ao alterar', 'Fechar');
      }
    );
  }

  private getFormContact(): Contact {
    let contact = this.form.value;
    if (this.isEdit) {
      contact.id = this.id;
    }
    return this.form.value;
  }

}
