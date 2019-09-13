import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  public auth(data: any): any {
    return this.http.post(`${environment.apiUrl}/accounts/authenticate`, data);
  }

  public createCustomer(data: any): any {
    return this.http.post(`${environment.apiUrl}/account`, data);
  }

  public resetPassword(data: any): any {
    return this.http.post(`${environment.apiUrl}/account/reset-password`, data);
  }

  public createContact(data: any): any {
    return this.http.post(`${environment.apiUrl}/contact`, data);
  }

  public removeContact(data: any): any {
    return this.http.delete(`${environment.apiUrl}/contact`, data);
  }

  public updateContact(data: any): any {
    return this.http.put(`${environment.apiUrl}/contact`, data);
  }

  public getContacts(): any {
    return this.http.get(`${environment.apiUrl}/contacts`);
  }

  public getContact(id: number): any {
    return this.http.get(`${environment.apiUrl}/contact`);
  }
  
}
