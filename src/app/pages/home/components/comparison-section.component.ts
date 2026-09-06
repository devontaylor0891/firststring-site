import { Component } from '@angular/core';

interface ComparisonRow {
  feature: string;
  firststring: string;
  other: string;
}

@Component({
  selector: 'app-comparison-section',
  standalone: true,
  templateUrl: './comparison-section.component.html',
  styleUrl: './comparison-section.component.scss',
})
export class ComparisonSectionComponent {
  readonly rows: ComparisonRow[] = [
    { feature: 'String-based roster tiers', firststring: 'Built-in', other: 'Not available' },
    { feature: 'Automatic callup offers on drops', firststring: 'Instant push', other: 'Manual' },
    { feature: 'RSVP window by tier', firststring: 'Per-string timing', other: 'Everyone at once' },
    {
      feature: 'Callup confirm deadline + reminder',
      firststring: '30-min nudge',
      other: 'Not available',
    },
    {
      feature: 'Nudge non-responders',
      firststring: 'Per-player + bulk, with cooldowns',
      other: 'Basic reminders only',
    },
    {
      feature: 'Manager override from attendance view',
      firststring: 'One tap',
      other: 'Limited',
    },
    {
      feature: 'Built for adult rec leagues',
      firststring: 'Designed for it',
      other: 'Built for youth / competitive',
    },
    { feature: 'Ad-free experience', firststring: 'Always', other: 'Free tiers show ads' },
  ];
}
