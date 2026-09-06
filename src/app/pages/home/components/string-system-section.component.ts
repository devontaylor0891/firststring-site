import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

interface Tier {
  badge: string;
  title: string;
  description: string;
  modifier: string;
}

@Component({
  selector: 'app-string-system-section',
  standalone: true,
  imports: [NgClass],
  templateUrl: './string-system-section.component.html',
  styleUrl: './string-system-section.component.scss',
})
export class StringSystemSectionComponent {
  readonly tiers: Tier[] = [
    {
      badge: '1st String',
      title: 'Your Core',
      description:
        'When a game is scheduled, 1st stringers are the first to get an RSVP notification. Their window opens before anyone else\'s. A window is just a set amount of time to confirm before the spot moves on. Respond in time and the spot is yours, no competition.',
      modifier: 'first',
    },
    {
      badge: '2nd String',
      title: 'The Regulars',
      description:
        'Their RSVP window opens after 1st string has had its chance. When a 1st stringer drops, or doesn\'t respond before their window closes, FirstString automatically sends a callup to the next available 2nd stringer, who gets their own window to confirm.',
      modifier: 'second',
    },
    {
      badge: '3rd String',
      title: 'The Depth',
      description:
        'Called up only when the numbers actually need them. Great for occasional players, spares, or anyone working their way into a regular spot. They only get the nudge when 1st and 2nd string can\'t fill the roster.',
      modifier: 'third',
    },
  ];
}
