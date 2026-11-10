import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, formatCompanyAddress } from '../../shared/constants';
import { StoreBadgesComponent } from '../store-badges/store-badges.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, StoreBadgesComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly email = COMPANY.email;
  readonly legalName = COMPANY.legalName;
  readonly operatingName = COMPANY.operatingName;
  readonly address = formatCompanyAddress();
}
