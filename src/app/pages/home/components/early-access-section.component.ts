import { Component, AfterViewInit, signal } from '@angular/core';

const SITE_URL = 'https://firststringapp.com';
const SHARE_MESSAGE = `I just signed up for early access to FirstString — a sports team management app that makes running your rec team actually fun. Roster, scheduling, reminders, RSVPs — all sorted. Check it out: ${SITE_URL}`;

@Component({
  selector: 'app-early-access-section',
  standalone: true,
  templateUrl: './early-access-section.component.html',
  styleUrl: './early-access-section.component.scss',
})
export class EarlyAccessSectionComponent implements AfterViewInit {
  submitted = signal(false);
  copied = signal(false);

  ngAfterViewInit(): void {
    if (sessionStorage.getItem('scrollToSignup')) {
      sessionStorage.removeItem('scrollToSignup');
      setTimeout(() => {
        document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  onSubmit(): void {
    this.submitted.set(true);
  }

  shareOnFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  copyShareMessage(): void {
    navigator.clipboard.writeText(SHARE_MESSAGE).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    });
  }
}
