import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() modal: any;
  @Input() type = 'sucesso';
  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  fechar() {
    this.modal.hide();
  }
}
