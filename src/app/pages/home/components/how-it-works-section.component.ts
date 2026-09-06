import { Component } from '@angular/core';

interface Step {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works-section',
  standalone: true,
  templateUrl: './how-it-works-section.component.html',
  styleUrl: './how-it-works-section.component.scss',
})
export class HowItWorksSectionComponent {
  readonly steps: Step[] = [
    {
      number: 1,
      title: 'Set Your Strings',
      description:
        'Assign each player to 1st, 2nd, or 3rd string. Your core players are always prioritized. Your roster order stays yours to control.',
    },
    {
      number: 2,
      title: 'Windows Open Automatically',
      description:
        'RSVP windows open by string tier: 1st stringers first, then 2nd, then 3rd. No overlap, no jumping the queue.',
    },
    {
      number: 3,
      title: 'Callups Fire on Drops',
      description:
        'Someone cancels? The next eligible player gets a callup push instantly, with a countdown to confirm before the spot moves on.',
    },
    {
      number: 4,
      title: 'Reminders Close the Loop',
      description:
        '30 minutes before a callup expires, the player gets a nudge. If they confirm, great. If not, the next person is up automatically.',
    },
    {
      number: 5,
      title: 'Nudge the Fence-Sitters',
      description:
        'One tap to push non-responders, by position or all at once. Per-player cooldowns mean no one gets spammed.',
    },
    {
      number: 6,
      title: 'Override Anytime',
      description:
        'Need to manually confirm someone? One tap from the attendance modal. The system adjusts counts and queues automatically.',
    },
  ];
}
