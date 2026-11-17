import { RenderMode, ServerRoute } from '@angular/ssr';

// Static site: the page is rendered to HTML at build time (outputMode "static").
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
