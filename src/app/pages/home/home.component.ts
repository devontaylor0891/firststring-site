import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { FeatureHighlightsComponent } from './components/feature-highlights.component';
import { EarlyAccessSectionComponent } from './components/early-access-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, FeatureHighlightsComponent, EarlyAccessSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
