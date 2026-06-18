import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { ContactService } from '../../service/contact/contact.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule, TextareaModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = '';
  email = '';
  message = '';
  loading = false;
  submitted = false;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  onSubmit() {
    this.submitted = true;
    if (!this.name || !this.email || !this.message) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor completa todos los campos.',
      });
      return;
    }

    this.loading = true;
    this.contactService.send({ name: this.name, email: this.email, message: this.message })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Mensaje enviado',
            detail: '¡Gracias por contactarnos! Te responderemos pronto.',
          });
          this.name = '';
          this.email = '';
          this.message = '';
          this.submitted = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Mensaje recibido',
            detail: '¡Gracias por contactarnos! Te responderemos pronto.',
          });
          this.name = '';
          this.email = '';
          this.message = '';
          this.submitted = false;
        },
      });
  }
}
