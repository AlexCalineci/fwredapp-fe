import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: './donation-map.component.html',
  providers: [MessageService, ConfirmationService]
})
export class DonationMapComponent implements OnInit {


  @ViewChild('filter') filter!: ElementRef;

  constructor(private messageService:MessageService,private confirmationService:ConfirmationService) { }

  ngOnInit() {


  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
