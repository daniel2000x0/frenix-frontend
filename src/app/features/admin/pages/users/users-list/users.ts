import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

interface UserItem {
  userid: number;
  userfirstname: string;
  userlastname: string;
  useremail: string;
  userstatus: boolean;
}

@Component({
  selector: 'app-users',
  imports: [CommonModule, TableModule, ButtonModule, CardModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: UserItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = [
      { userid: 1, userfirstname: 'Admin', userlastname: 'Sistema', useremail: 'admin@fenix.com', userstatus: true },
      { userid: 2, userfirstname: 'Juan', userlastname: 'Pérez', useremail: 'juan@example.com', userstatus: true },
      { userid: 3, userfirstname: 'María', userlastname: 'García', useremail: 'maria@example.com', userstatus: false },
    ];
  }

  createUser() {
    this.router.navigate(['/admin/users/create']);
  }
}
