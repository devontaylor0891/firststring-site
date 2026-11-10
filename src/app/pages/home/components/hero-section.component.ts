import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadgesComponent } from '../../../components/store-badges/store-badges.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, StoreBadgesComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {}
