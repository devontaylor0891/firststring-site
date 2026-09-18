import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, formatCompanyAddress } from '../../shared/constants';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
})
export class TermsComponent {
  readonly effectiveDate = 'September 18, 2026';
  readonly lastUpdated = 'September 18, 2026';
  readonly minimumAge = 16;
  readonly contactEmail = COMPANY.email;
  readonly legalName = COMPANY.legalName;
  readonly operatingName = COMPANY.operatingName;
  readonly address = formatCompanyAddress();
}
