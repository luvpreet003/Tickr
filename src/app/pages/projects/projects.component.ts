import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectList: any[] = [];
  projectObj: any = {
    projectId: 0,
    projectName: '',
    shortName: '',
    createdDate: new Date(),
  };
  isEditing: boolean = false;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((res: any) => {
      this.projectList = res.data;
    });
  }

  navigateToDetails(projectId: number) {
    console.log(projectId);
    this.router.navigate(['/board', projectId]); // Navigate with dynamic ID
  }

  resetProjectForm() {
    this.isEditing = false;
    this.projectObj = {
      projectId: 0,
      projectName: '',
      shortName: '',
      createdDate: new Date(),
    };
  }

  onSave() {
    if (this.isEditing) {
      this.projectService
        .updateProject(this.projectObj)
        .subscribe((res: any) => {
          alert(res.message);
          this.isEditing = false;
          this.getAllProjects();
        });
    } else {
      this.projectService
        .createProject(this.projectObj)
        .subscribe((res: any) => {
          alert(res.message);
          this.getAllProjects();
        });
    }
  }

  onEdit(project: any, e: Event) {
    e.stopPropagation();
    this.projectObj = { ...project };
    this.isEditing = true;
  }

  onDelete(id: number, e: Event) {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe((res: any) => {
        alert(res.message);
        this.getAllProjects();
      });
    }
  }
}
