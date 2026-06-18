import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user',
  imports: [CardModule],
  template: `
    <p-card header="User Management">
      <p class="m-0">
        Manage users and their roles here.
      </p>
    </p-card>
  `,
  styles: ``,
})
export class User {

}
