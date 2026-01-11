import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import { enviroment } from '../../../../environments/enviroment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [  PasswordModule,ReactiveFormsModule, 
    CardModule,
    InputTextModule,
    PasswordModule,
    CommonModule, 
    ButtonModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
 logInForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logins(): void {
    if (this.logInForm.invalid || this.loading) return;

    this.loading = true;
    const  loginData ={
      useremail: this.logInForm.value.email,
      userpassword: this.logInForm.value.password
    }
    this.authService.login(loginData).subscribe({
      next: (res) => {
            console.log('LOGIN RESPONSE ', res);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loading = false;   
      }
    });

    console.log();
  }

}
