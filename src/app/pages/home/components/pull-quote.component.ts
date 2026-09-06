import { Component, signal } from '@angular/core';

const FB_URL = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffirststringapp.com';
const SHARE_TEXT =
  'I just joined the early access list for FirstString. Sports team management built for rec captains: roster, scheduling, automatic callups when someone drops, and more. Worth a look: https://firststringapp.com';

@Component({
  selector: 'app-pull-quote',
  standalone: true,
  templateUrl: './pull-quote.component.html',
  styleUrl: './pull-quote.component.scss',
})
export class PullQuoteComponent {
  copied = signal(false);

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
