import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports: [   FormsModule,  CardModule,
    InputTextModule,],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
 name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    if (this.name && this.email && this.message) {
      console.log('Mensaje enviado:', { name: this.name, email: this.email, message: this.message });
      alert('¡Gracias por contactarnos!');
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
