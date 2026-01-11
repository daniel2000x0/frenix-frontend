import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule,CardModule,AvatarModule,ButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user = {
  name: 'Juan Pérez',
  email: 'juan@mail.com'
};

logout() {
  console.log('Cerrar sesión');
}

}
