import { Component } from '@angular/core';
import { StoreBadgesComponent } from '../../components/store-badges/store-badges.component';
import { PricingFaqComponent } from './components/pricing-faq.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [StoreBadgesComponent, PricingFaqComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {}
