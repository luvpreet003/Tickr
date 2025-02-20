import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonService } from '../../../../src/app/services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  ticketsArray: any[] = [];
  selectedProjectData: any;
  status: string[] = ['To Do', 'In Progress', 'Done'];

  constructor(private master: CommonService, private http: HttpClient) {
    this.master.onProjectChange.subscribe((res: any) => {
      debugger;
      this.getProjectTickets(res.projectId);
      this.selectedProjectData = res;
    });
    this.master.onTicketCreate.subscribe((res: any) => {
      debugger;
      this.getProjectTickets(this.selectedProjectData.projectId);
    });
  }

  getProjectTickets(id: number) {
    this.http
      .get('/api/Jira/GetTicketsByProjectId?projectid=' + id)
      .subscribe((res: any) => {
        this.ticketsArray = res.data;
      });
  }

  filterTicket(status: string) {
    return this.ticketsArray.filter((m) => m.status == status);
  }
}
