import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './payment-result.html',
  styleUrl: './payment-result.css',
})
export class PaymentResult implements OnInit {
  success: boolean = false;
  method: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.success = params['success'] === 'true';
      this.method = params['method'] || 'unknown';
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  retry() {
    this.router.navigate(['/payment/method']);
  }
}
