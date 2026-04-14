import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-feature-highlights',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feature-highlights.component.html',
  styleUrl: './feature-highlights.component.scss',
})
export class FeatureHighlightsComponent {
  features: Feature[] = [
    {
      icon: '📣',
      title: 'No More Chasing',
      description:
        'Game reminders go out automatically. Players reply, you see who\'s in. No group texts required.',
    },
    {
      icon: '✅',
      title: 'Know Your Lineup',
      description:
        'See who\'s confirmed, who\'s out, and who hasn\'t responded — before you leave the house.',
    },
    {
      icon: '⚡',
      title: 'Fill Spots Fast',
      description:
        'Someone bails last minute? Invite a call-up with a tap and they\'re in the loop instantly.',
    },
  ];
}
