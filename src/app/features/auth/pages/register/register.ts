import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../../service/auth/auth.service';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CardModule, InputTextModule, ButtonModule, ReactiveFormsModule,SelectModule,PasswordModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   registerForm!: FormGroup;
  loading = false;

  genders = [
    { label: 'Masculino', value: 1 },
    { label: 'Femenino', value: 2 },
    { label: 'Otro', value: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      birthDate: ['', Validators.required],
      genderId: [null, Validators.required]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    
  const formValue = this.registerForm.value;

 const payload = {
    email: formValue.email,
    password: formValue.password,
    firstName: formValue.firstName,
    lastName: formValue.lastName,
    birthDate: formValue.birthDate,
    genderId: formValue.genderId
  };
  console.log(payload);

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Usuario registrado correctamente');
        this.registerForm.reset();
  
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
    this.router.navigate(['/login']);
  }
  
}
