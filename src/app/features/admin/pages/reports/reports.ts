import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  reports = [
    { title: 'Ventas del Mes', description: 'Reporte detallado de ventas del mes actual', icon: 'pi pi-chart-line' },
    { title: 'Productos Más Vendidos', description: 'Top 10 productos con mayores ventas', icon: 'pi pi-star' },
    { title: 'Usuarios Registrados', description: 'Estadísticas de registro de usuarios', icon: 'pi pi-users' },
    { title: 'Ingresos por Categoría', description: 'Distribución de ingresos por categoría', icon: 'pi pi-chart-bar' },
  ];
}
