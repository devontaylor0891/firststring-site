import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureRow {
  id: string;
  icon: string;
  title: string;
  label: string;
  detail: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  features: FeatureRow[] = [
    {
      id: 'feature-reminders',
      icon: '📣',
      title: 'Reminders That Send Themselves',
      label: 'The reason we built this',
      detail:
        'FirstString automatically sends game reminders to your players and collects their RSVPs with no action required from you. Set it up once and it runs all season. No more group texts, no more chasing down replies the night before a game.',
    },
    {
      id: 'feature-lineup',
      icon: '✅',
      title: 'See Who\'s In Before Game Day',
      label: 'Know before you go',
      detail:
        'Every RSVP lands in your lineup view. You can see at a glance who\'s confirmed, who\'s out, and who still hasn\'t responded. Show up to the field knowing exactly what you\'re working with, not finding out when you get there.',
    },
    {
      id: 'feature-strings',
      icon: '🎯',
      title: 'String-Based Rosters',
      label: 'Your callup order, built in',
      detail:
        'Assign each player to 1st, 2nd, or 3rd string. When a spot opens up, FirstString works down the list automatically: it pushes the next eligible player, gives them a window to confirm, then moves on if they don\'t respond. Your core players always get priority. You don\'t lift a finger.',
    },
    {
      id: 'feature-callups',
      icon: '⚡',
      title: 'Automatic Callups on Every Drop',
      label: 'Never scramble for subs again',
      detail:
        'When someone cancels, the callup chain fires instantly. The next player on your roster gets a push notification with a countdown to confirm. No response? The spot moves to the next person automatically. Need to override? One tap from the attendance view and the system adjusts.',
    },
    {
      id: 'feature-roster',
      icon: '👥',
      title: 'Everyone in One Place',
      label: 'Your team, organized',
      detail:
        'Add your players once and you\'re done. Names, positions, phone numbers, email. All stored in the app. No more scrolling through your contacts or digging through last season\'s spreadsheet.',
    },
    {
      id: 'feature-schedule',
      icon: '📅',
      title: 'Build Your Schedule in Minutes',
      label: 'Your season, sorted',
      detail:
        'Set up your full season schedule fast: dates, times, locations, opponents. Share it with your team instantly. When something changes, update it once and everyone gets notified automatically.',
    },
    {
      id: 'feature-calendar',
      icon: '🗓️',
      title: 'Games Go Straight to Their Calendars',
      label: 'Zero extra effort',
      detail:
        'Players subscribe to the team calendar once. Every game shows up automatically in Google Calendar, Apple Calendar, or Outlook. No more "what time is the game again?" texts at 7am.',
    },
  ];

  scrollToFeature(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
