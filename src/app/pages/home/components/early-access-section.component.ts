import { Component, AfterViewInit, signal } from '@angular/core';

const FB_URL = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffirststringapp.com';
const SHARE_TEXT =
  'I just joined the early access list for FirstString. Sports team management built for rec captains: roster, scheduling, automatic callups when someone drops, and more. Worth a look: https://firststringapp.com';

@Component({
  selector: 'app-early-access-section',
  standalone: true,
  templateUrl: './early-access-section.component.html',
  styleUrl: './early-access-section.component.scss',
})
export class EarlyAccessSectionComponent implements AfterViewInit {
  copied = signal(false);

  ngAfterViewInit(): void {
    if (sessionStorage.getItem('scrollToSignup')) {
      sessionStorage.removeItem('scrollToSignup');
      setTimeout(() => {
        document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  shareOnFacebook(): void {
    window.open(FB_URL, '_blank', 'noopener,noreferrer,width=600,height=500');
  }

  copyShareMessage(): void {
    navigator.clipboard.writeText(SHARE_TEXT).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    });
  }
}
