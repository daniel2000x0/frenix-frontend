import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';
import { ToastModule } from 'primeng/toast';

@Component({
  
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fenix-frontend');
}
