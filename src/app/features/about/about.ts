import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
interface AboutSection {
  title: string;
  icon: string;
  description?: string;
  tags?: { label: string; severity: 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' }[];
}
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PanelModule,DividerModule,TagModule,CardModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
title = 'Sobre Nosotros';
  subtitle = 'Innovación • Tecnología • Calidad';

  introText = `
    Somos una empresa enfocada en el desarrollo de soluciones tecnológicas modernas.
    Creamos productos digitales escalables, seguros y fáciles de usar,
    siempre priorizando la experiencia del usuario.
  `;

  sections: AboutSection[] = [
    {
      title: 'Misión',
      icon: 'pi pi-flag',
      description:
        'Diseñar y desarrollar soluciones digitales eficientes que aporten valor real a nuestros clientes.'
    },
    {
      title: 'Visión',
      icon: 'pi pi-eye',
      description:
        'Convertirnos en un referente tecnológico, reconocidos por la calidad y confiabilidad de nuestros productos.'
    },
    {
      title: 'Valores',
      icon: 'pi pi-star',
      tags: [
        { label: 'Innovación constante', severity: 'success' },
        { label: 'Compromiso con la calidad', severity: 'info' },
        { label: 'Responsabilidad y ética', severity: 'warn' },
        { label: 'Enfoque en el usuario', severity: 'contrast' }
      ]
    }
  ];


}
