import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectList: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((res: any) => {
      this.projectList = res.data;
    });
  }
}
