import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Section links such as /privacy#data-deletion are handed to Google Play and Twilio
    // reviewers, so they must open at that section rather than the top of the page.
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
    // Anchor scrolling uses window.scrollTo, which ignores CSS scroll-margin, so leave room
    // for the sticky nav (56px, 52px on mobile) plus the legal pages' 24px gap.
    provideAppInitializer(() => inject(ViewportScroller).setOffset([0, 80])),
    provideHttpClient(),
  ],
};
