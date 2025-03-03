import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [CommonModule, FormsModule],
})
export class UsersComponent implements OnInit, AfterViewInit {
  userList: any[] = [];
  userObj: any = {
    userId: 0,
    emailId: '',
    password: '',
    fullName: '',
  };
  isEditing: boolean = false;
  modal: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.show();
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  getAllUsers() {
    this.usersService
      .getAllUsers()
      .pipe(
        catchError((err) => {
          console.error('Error fetching users', err);
          return of({ data: [] });
        })
      )
      .subscribe((res: any) => {
        this.userList = res.data || [];
      });
  }

  resetUserForm() {
    this.isEditing = false;
    this.userObj = {
      userId: 0,
      emailId: '',
      password: '',
      fullName: '',
    };
  }

  onSave() {
    const apiCall = this.isEditing
      ? this.usersService.updateUser(this.userObj)
      : this.usersService.createUser(this.userObj);

    apiCall
      .pipe(
        catchError((err) => {
          alert('Something went wrong!');
          return of({ result: false });
        })
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert(
            this.isEditing
              ? 'User updated successfully'
              : 'User created successfully'
          );
          this.getAllUsers();
          this.closeModal();
        } else {
          alert('Operation failed');
        }
      });
  }

  onEdit(user: any) {
    this.isEditing = true;
    this.userObj = { ...user }; // Copy user data to avoid reference issues

    // Use setTimeout to ensure the UI updates before the modal opens
    setTimeout(() => {
      this.openModal();
    }, 100);
  }

  onDelete(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService
        .deleteUser(userId)
        .pipe(
          catchError((err) => {
            alert('Error deleting user');
            return of({ result: false });
          })
        )
        .subscribe((res: any) => {
          if (res.result) {
            alert('User deleted successfully');
            this.getAllUsers();
          } else {
            alert('Deletion failed');
          }
        });
    }
  }
}
