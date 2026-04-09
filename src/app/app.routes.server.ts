import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'update/:id',
    renderMode: RenderMode.Server // or RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
