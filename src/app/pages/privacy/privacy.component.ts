import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, formatCompanyAddress } from '../../shared/constants';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {
  readonly effectiveDate = 'September 8, 2026';
  readonly lastUpdated = 'September 18, 2026';
  readonly contactEmail = COMPANY.email;
  readonly legalName = COMPANY.legalName;
  readonly operatingName = COMPANY.operatingName;
  readonly address = formatCompanyAddress();
}
