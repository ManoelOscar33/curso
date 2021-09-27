import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCESS = 'sucess'
}

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  modal: any;

  constructor() { }

  private showAlert(message: string, type: AlertTypes) {
    const modal: any = this.modal.show(AlertModalComponent);
    modal.content.type = type;
    modal.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSucess(message: string) {
    this.showAlert(message, AlertTypes.SUCESS)
  }
}
