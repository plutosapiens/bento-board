import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service'; // Updated import
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model'; // Updated import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <h2>Tickets</h2>
    <ul *ngIf="tickets$ | async as tickets">
      <li *ngFor="let ticket of tickets">{{ ticket.title }}</li>
    </ul>
  `,
  imports: [CommonModule],
})
export class TestComponent implements OnInit {
  tickets$: Observable<Ticket[]> | undefined; // Updated property

  constructor(private ticketService: TicketService) {} // Updated service

  ngOnInit(): void {
    // Replace 'yourBoardId' with an actual board ID from your Firestore database.
    this.tickets$ = this.ticketService.getTickets('yourBoardId'); // Updated method call
  }
}