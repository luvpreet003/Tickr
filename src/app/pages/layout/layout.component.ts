import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../src/app/services/common.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from './layout.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [FormsModule, RouterOutlet, CommonModule],
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
    assignedTo: '',
    createdBy: 0,
    projectId: 0,
  };

  constructor(
    private layoutService: LayoutService,
    private commonServices: CommonService,
    private authService: AuthService
  ) {
    const loginData = localStorage.getItem('jiraLoginDetails');
    if (loginData != null) {
      const parsedData = JSON.parse(loginData);
      this.ticketObj.createdBy = parsedData.userId;
    }
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers();
  }

  setProject(obj: any) {
    this.commonServices.onProjectChange.next(obj);
  }

  getAllProjects() {
    this.layoutService.getAllProjects().subscribe((res: any) => {
      this.projectList = res.data;
      this.commonServices.onProjectChange.next(this.projectList[0]);
    });
  }

  logout() {
    this.authService.logout(); // ✅ Calls logout function
  }

  getAllUsers() {
    this.layoutService.getAllUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  onTicketCreate() {
    this.layoutService.createTicket(this.ticketObj).subscribe((res: any) => {
      alert(res.message);
      if (res.result) {
        this.commonServices.onTicketCreate.next(true);
      }
    });
  }
}
