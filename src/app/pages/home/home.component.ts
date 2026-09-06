import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { ProblemSectionComponent } from './components/problem-section.component';
import { HowItWorksSectionComponent } from './components/how-it-works-section.component';
import { StringSystemSectionComponent } from './components/string-system-section.component';
import { ComparisonSectionComponent } from './components/comparison-section.component';
import { PullQuoteComponent } from './components/pull-quote.component';
import { EarlyAccessSectionComponent } from './components/early-access-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ProblemSectionComponent,
    HowItWorksSectionComponent,
    StringSystemSectionComponent,
    ComparisonSectionComponent,
    PullQuoteComponent,
    EarlyAccessSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
