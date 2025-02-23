import { Component, OnInit } from '@angular/core';
import { TicketService } from './board.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Ticket {
  ticketId: number;
  createdDate: string;
  summary?: string;
  status?: string;
  description?: string;
  parentId?: number;
  storyPoint?: number;
  ticketGuid: string;
  assignedTo: string;
  createdBy?: number;
  projectId: number;
}

interface User {
  userId: number;
  fullName: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [CommonModule, FormsModule],
})
export class BoardComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  statuses: string[] = ['To Do', 'In Progress', 'Done'];

  users: User[] = [];
  selectedUser: string = '';
  searchQuery: string = '';

  isModalOpen = false;
  selectedTicket: Ticket = {
    ticketId: 0,
    createdDate: '',
    summary: '',
    status: '',
    description: '',
    parentId: 0,
    storyPoint: 0,
    ticketGuid: '',
    assignedTo: '',
    createdBy: 0,
    projectId: 0,
  };
  projectId: string = '';

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadUsers();
    // this.projectId = this.route.snapshot.paramMap.get('projectId') || '';
    console.log(this.projectId);
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('projectId') || '';
      console.log('Project ID:', this.projectId);
    });
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets(this.projectId).subscribe((data: any) => {
      this.tickets = data.data;
      this.filteredTickets = data.data;
      console.log(this.filteredTickets);
    });
  }

  loadUsers() {
    this.ticketService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }

  getFilteredTickets(status: string) {
    return this.filteredTickets.filter((ticket) => ticket.status === status);
  }

  applyFilters() {
    this.filteredTickets = this.tickets.filter((ticket) => {
      const matchesUser = this.selectedUser
        ? ticket.assignedTo == this.selectedUser
        : true;
      const matchesSearch = (ticket.summary ?? '')
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      return matchesUser && matchesSearch;
    });
  }

  editTicket(ticket: Ticket) {
    return this.http
      .post(`/api/Jira/GetTicketById?id=${ticket.ticketId}`, {
        id: ticket.ticketId,
      })
      .subscribe((res: any) => {
        this.selectedTicket = res.data;
        this.isModalOpen = true;
      });
  }

  saveChanges() {
    if (this.selectedTicket) {
      this.ticketService.updateTicket(this.selectedTicket).subscribe(() => {
        this.loadTickets();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    document.getElementById('cancelModalbtn')?.click();
  }

  deleteTicket(ticketId: number) {
    this.ticketService.deleteTicket(ticketId).subscribe(() => {
      this.loadTickets();
    });
  }

  hasTicketsForStatus(status: string): boolean {
    return this.filteredTickets.some((ticket) => ticket.status === status);
  }

  openEditModal(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.isModalOpen = true;
  }
}
