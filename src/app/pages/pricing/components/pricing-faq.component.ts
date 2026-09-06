import { Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  open: ReturnType<typeof signal<boolean>>;
}

@Component({
  selector: 'app-pricing-faq',
  standalone: true,
  imports: [],
  templateUrl: './pricing-faq.component.html',
  styleUrl: './pricing-faq.component.scss',
})
export class PricingFaqComponent {
  faqs: FaqItem[] = [
    {
      question: 'Is there a free trial?',
      answer:
        "We're currently in beta. Join the waitlist for early access. Beta users get the first season free and locked-in pricing when we launch publicly.",
      open: signal(false),
    },
    {
      question: 'What sports does FirstString work for?',
      answer:
        'Any adult rec sport where you manage a roster and fill a lineup: hockey, soccer, basketball, volleyball, baseball, and more. If you need a minimum number of players to run a game, FirstString is built for you.',
      open: signal(false),
    },
    {
      question: 'What happens when my year is up?',
      answer:
        'Your account continues in read-only mode until renewed. You can still view your roster, schedule, and history, but you cannot make edits or send new messages until you renew.',
      open: signal(false),
    },
    {
      question: 'Can I manage multiple teams?',
      answer:
        'Yes. Each team is its own subscription at $50/year. If you run two teams, you\'d have two subscriptions, one per team.',
      open: signal(false),
    },
  ];

  toggle(item: FaqItem): void {
    const current = item.open();
    // Close all others first
    this.faqs.forEach((f) => f.open.set(false));
    item.open.set(!current);
  }
}
