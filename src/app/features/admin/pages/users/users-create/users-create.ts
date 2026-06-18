import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-create',
  imports: [
    CommonModule, ReactiveFormsModule, CardModule, InputTextModule,
    ButtonModule, SelectModule, PasswordModule,
  ],
  templateUrl: './users-create.html',
  styleUrl: './users-create.css',
})
export class UsersCreate implements OnInit {
  userForm!: FormGroup;
  loading = false;

  genders = [
    { label: 'Masculino', value: 1 },
    { label: 'Femenino', value: 2 },
    { label: 'Otro', value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      userfirstname: ['', [Validators.required, Validators.maxLength(20)]],
      userlastname: ['', [Validators.required, Validators.maxLength(20)]],
      useremail: ['', [Validators.required, Validators.email]],
      userpassword: ['', [Validators.required, Validators.minLength(8)]],
      usergender: [null, Validators.required],
    });
  }

  save() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    console.log('Save user', this.userForm.value);
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/admin/users/list']);
    }, 500);
  }

  cancel() {
    this.router.navigate(['/admin/users/list']);
  }
}
