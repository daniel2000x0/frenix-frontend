import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-process',
  imports: [CommonModule, ProgressSpinnerModule, CardModule],
  templateUrl: './payment-process.html',
  styleUrl: './payment-process.css',
})
export class PaymentProcess implements OnInit {
  method: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.method = params['method'] || 'unknown';
    });
    setTimeout(() => {
      const success = Math.random() > 0.3;
      this.router.navigate(['/payment/result'], {
        queryParams: { success, method: this.method }
      });
    }, 2500);
  }
}
