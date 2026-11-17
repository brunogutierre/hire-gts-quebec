import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // A single page: the router only exists so the build can prerender it.
    provideRouter(routes),
    // The page is prerendered to static HTML; hydration reuses that DOM instead of re-rendering,
    // and event replay keeps clicks made before the app finished booting.
    provideClientHydration(withEventReplay()),
  ],
};
