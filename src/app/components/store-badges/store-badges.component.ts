import { Component } from '@angular/core';
import { STORE_URLS } from '../../shared/constants';

/**
 * Official App Store and Google Play badges. Both stores require their own
 * artwork, unaltered, and neither badge may be smaller than the other. Set
 * --badge-height on the host to size them.
 */
@Component({
  selector: 'app-store-badges',
  standalone: true,
  templateUrl: './store-badges.component.html',
  styleUrl: './store-badges.component.scss',
})
export class StoreBadgesComponent {
  readonly urls = STORE_URLS;
}
