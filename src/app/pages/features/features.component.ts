import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureRow {
  id: string;
  icon: string;
  title: string;
  label: string;
  detail: string;
}

interface CarouselSlide {
  icon: string;
  heading: string;
  body: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent implements OnDestroy {
  // Carousel state — component-local UI only
  currentSlide = signal(0);

  slides: CarouselSlide[] = [
    {
      icon: '📣',
      heading: 'Reminders go out. RSVPs come back.',
      body: 'Before every game, FirstString sends your players a reminder and asks if they\'re in. You don\'t lift a finger. It runs all season, automatically.',
    },
    {
      icon: '✅',
      heading: 'Know your lineup before you leave the house.',
      body: 'Open the app and see exactly who\'s confirmed, who\'s out, and who hasn\'t responded yet. Show up to the field prepared — not surprised.',
    },
    {
      icon: '⚡',
      heading: 'Someone bails? Fill the spot in seconds.',
      body: 'Invite a call-up with a single tap. They\'re added to the roster, get the same reminders, and know exactly where to show up. Problem solved.',
    },
  ];

  private autoAdvance = setInterval(() => this.next(), 5000);

  next(): void {
    this.currentSlide.update(i => (i + 1) % this.slides.length);
  }

  prev(): void {
    this.currentSlide.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number): void {
    this.currentSlide.set(index);
    // Reset auto-advance timer on manual nav
    clearInterval(this.autoAdvance);
    this.autoAdvance = setInterval(() => this.next(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.autoAdvance);
  }

  features: FeatureRow[] = [
    {
      id: 'feature-reminders',
      icon: '📣',
      title: 'Reminders That Send Themselves',
      label: 'The reason we built this',
      detail:
        'FirstString automatically sends game reminders to your players and collects their RSVPs — no action required from you. Set it up once and it runs all season. No more group texts, no more chasing down replies the night before a game.',
    },
    {
      id: 'feature-lineup',
      icon: '✅',
      title: 'See Who\'s In Before Game Day',
      label: 'Know before you go',
      detail:
        'Every RSVP lands in your lineup view. You can see at a glance who\'s confirmed, who\'s out, and who still hasn\'t responded. Show up to the field knowing exactly what you\'re working with — not finding out when you get there.',
    },
    {
      id: 'feature-callups',
      icon: '⚡',
      title: 'Fill Spots in Seconds',
      label: 'Never play short',
      detail:
        'When someone drops out, invite a call-up with a single tap. They get added to the roster and receive all the same automated reminders. Problem solved before it becomes a problem.',
    },
    {
      id: 'feature-roster',
      icon: '👥',
      title: 'Everyone in One Place',
      label: 'Your team, organized',
      detail:
        'Add your players once and you\'re done. Names, positions, phone numbers, email — all stored in the app. No more scrolling through your contacts or digging through last season\'s spreadsheet.',
    },
    {
      id: 'feature-schedule',
      icon: '📅',
      title: 'Build Your Schedule in Minutes',
      label: 'Your season, sorted',
      detail:
        'Set up your full season schedule fast — dates, times, locations, opponents. Share it with your team instantly. When something changes, update it once and everyone gets notified automatically.',
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
