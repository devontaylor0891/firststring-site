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
      question: 'Can I upgrade my plan later?',
      answer:
        'Yes. You can upgrade from Single Team to Club or Organization at any time. Upgrades are prorated — you only pay the difference for the remaining days in your billing period.',
      open: signal(false),
    },
    {
      question: 'Is there a free trial?',
      answer:
        "We're currently in beta. Join the waitlist for early access — beta users get the first season free and locked-in pricing when we launch publicly.",
      open: signal(false),
    },
    {
      question: 'What happens when my year is up?',
      answer:
        'Your account continues in read-only mode until renewed. You can still view your roster, schedule, and history — you just cannot make edits or send new messages until your subscription is renewed.',
      open: signal(false),
    },
    {
      question: 'Do add-ons renew annually?',
      answer:
        'Yes, all add-ons are billed annually alongside your base plan. You can add or remove add-ons at renewal time, or contact us to adjust mid-year.',
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
