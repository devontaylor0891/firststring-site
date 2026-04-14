import { Component, signal } from '@angular/core';

interface AddOn {
  icon: string;
  name: string;
  price: string;
  description: string;
  note?: string;
  features: string[];
}

@Component({
  selector: 'app-add-ons-grid',
  standalone: true,
  imports: [],
  templateUrl: './add-ons-grid.component.html',
  styleUrl: './add-ons-grid.component.scss',
})
export class AddOnsGridComponent {
  showAddOns = signal(false);

  toggleAddOns(): void {
    this.showAddOns.update((v) => !v);
  }

  addOns: AddOn[] = [
    {
      icon: '🏆',
      name: 'Tournament Mode',
      price: '$25 / team / yr',
      description: 'Run full tournaments right inside FirstString.',
      features: [
        'Multi-day brackets',
        'Round-robin scheduling',
        'Guest rostering',
        'Results tracking',
      ],
    },
    {
      icon: '💰',
      name: 'Fee Tracking',
      price: '$20 / team / yr',
      description: 'Track dues, mark paid/unpaid, and send reminders.',
      note: 'Included free in Club & Organization',
      features: [
        'Per-player due tracking',
        'Mark paid / unpaid',
        'Automated reminders',
        'Payment history export',
      ],
    },
    {
      icon: '⚡',
      name: 'Call-Up Payments',
      price: '$30 / team / yr + transaction %',
      description: 'Charge call-up players their game fee in-app via Stripe.',
      note: 'Club & Organization only. Requires Stripe.',
      features: [
        'Per-game charge to call-ups',
        'Stripe integration',
        'Automatic payouts',
        'Transaction history',
      ],
    },
  ];
}
