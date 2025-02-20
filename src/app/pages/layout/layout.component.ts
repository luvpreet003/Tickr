import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../src/app/services/common.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [FormsModule, RouterOutlet],
})
export class LayoutComponent implements OnInit {
  projectList: any[] = [];
  userList: any[] = [];
  issueTypes: string[] = ['Ticket', 'Defect', 'RnD Work'];
  status: string[] = ['To Do', 'In Progress', 'Done'];

  ticketObj: any = {
    ticketId: 0,
    createdDate: '2023-08-18T05:58:41.065Z',
    summary: '',
    status: '',
    description: '',
    parentId: 0,
    storyPoint: 0,
    ticketGuid: '',
    assignedTo: 0,
    createdBy: 0,
    projectId: 0,
  };

  constructor(private http: HttpClient, private commonServices: CommonService) {
    const loginData = localStorage.getItem('jiraLoginDetails');
    if (loginData != null) {
      const paserData = JSON.parse(loginData);
      this.ticketObj.createdBy = paserData.userId;
    }
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers();
  }
  setProject(obj: any) {
    debugger;
    this.commonServices.onProjectChange.next(obj);
  }

  getAllProjects() {
    this.http.get('/api/Jira/GetAllProjects').subscribe((res: any) => {
      this.projectList = res.data;
      debugger;
      this.commonServices.onProjectChange.next(this.projectList[0]);
    });
  }
  getAllUsers() {
    this.http.get('/api/Jira/GetAllUsers').subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  onTicketCreate() {
    this.http
      .post('/api/Jira/CreateTicket', this.ticketObj)
      .subscribe((res: any) => {
        if (res.result) {
          alert(res.message);
          this.commonServices.onTicketCreate.next(true);
        } else {
          alert(res.message);
        }
      });
  }
}
