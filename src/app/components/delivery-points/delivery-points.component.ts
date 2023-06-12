import { Component, OnInit} from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: './delivery-points.component.html',
  providers: [MessageService, ConfirmationService],
})
export class DeliveryPointsComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {

  }
}
