import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PricingFaqComponent } from './components/pricing-faq.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, PricingFaqComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {}
