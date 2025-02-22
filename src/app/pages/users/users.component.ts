import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [CommonModule, FormsModule],
})
export class UsersComponent implements OnInit {
  userList: any[] = [];
  userObj: any = {
    userId: 0,
    emailId: '',
    password: '',
    fullName: '',
  };
  isEditing: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.userList = res.data;
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
    if (this.isEditing) {
      this.usersService.updateUser(this.userObj).subscribe((res: any) => {
        if (res.result) {
          alert('User updated successfully');
          this.getAllUsers();
        } else {
          alert('Update failed');
        }
      });
    } else {
      this.usersService.createUser(this.userObj).subscribe((res: any) => {
        if (res.result) {
          alert('User created successfully');
          this.getAllUsers();
        } else {
          alert('Creation failed');
        }
      });
    }
  }

  onEdit(user: any) {
    this.isEditing = true;
    this.userObj = { ...user };
  }

  onDelete(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(userId).subscribe((res: any) => {
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
