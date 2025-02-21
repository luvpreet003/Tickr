import { Component, OnInit } from '@angular/core';
import { TicketService } from './board.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  styleUrls: ['./board.component.css'],
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
    private route: ActivatedRoute
  ) {}

  // loadSampleTickets() {
  //   this.tickets = [
  //     {
  //       ticketId: 1,
  //       createdDate: '2025-02-20',
  //       summary: 'Fix login bug',
  //       status: 'To Do',
  //       description: 'Fix login issue on mobile',
  //       parentId: 0,
  //       storyPoint: 3,
  //       ticketGuid: '123',
  //       assignedTo: 1,
  //       createdBy: 2,
  //       projectId: 1,
  //     },
  //     {
  //       ticketId: 2,
  //       createdDate: '2025-02-21',
  //       summary: 'Add dark mode',
  //       status: 'Development',
  //       description: 'Implement dark mode UI',
  //       parentId: 0,
  //       storyPoint: 5,
  //       ticketGuid: '456',
  //       assignedTo: 2,
  //       createdBy: 1,
  //       projectId: 1,
  //     },
  //     {
  //       ticketId: 3,
  //       createdDate: '2025-02-22',
  //       summary: 'Code review for API',
  //       status: 'Code Review',
  //       description: 'Review the new API code',
  //       parentId: 0,
  //       storyPoint: 2,
  //       ticketGuid: '789',
  //       assignedTo: 3,
  //       createdBy: 1,
  //       projectId: 1,
  //     },
  //     {
  //       ticketId: 4,
  //       createdDate: '2025-02-23',
  //       summary: 'Deploy to production',
  //       status: 'Closed',
  //       description: 'Final deployment to production',
  //       parentId: 0,
  //       storyPoint: 4,
  //       ticketGuid: '012',
  //       assignedTo: 2,
  //       createdBy: 1,
  //       projectId: 1,
  //     },
  //   ];
  //   this.filteredTickets = [...this.tickets];
  // }

  // loadSampleUsers() {
  //   this.users = [
  //     { id: 1, name: 'Alice' },
  //     { id: 2, name: 'Bob' },
  //     { id: 3, name: 'Charlie' },
  //   ];
  // }

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

    //remove

    // this.loadSampleTickets();
  }

  loadUsers() {
    this.ticketService.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });

    // this.loadSampleUsers();
  }

  getFilteredTickets(status: string) {
    return this.filteredTickets.filter((ticket) => ticket.status === status);
  }

  applyFilters() {
    console.log('cf');
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
    console.log(ticket);
    this.selectedTicket = ticket;
    this.isModalOpen = true;
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
    this.selectedTicket = { ...ticket }; // Clone to avoid modifying original before saving
    this.isModalOpen = true;
  }

  // 🎨 Get Color for Status Label
  getStatusClass(status: string = ''): string {
    switch (status.toUpperCase()) {
      case 'TODO':
        return 'status-todo'; // Yellow
      case 'DEVELOPMENT':
        return 'status-development'; // Green
      case 'CODE REVIEW':
        return 'status-code-review'; // Blue
      case 'CLOSED':
        return 'status-closed'; // Gray
      default:
        return '';
    }
  }
}
