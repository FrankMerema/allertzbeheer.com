import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: {
      titleKey: 'seo.home.title',
      descriptionKey: 'seo.home.description',
      canonicalPath: '/',
    },
  },
  {
    path: 'diensten',
    loadComponent: () =>
      import('./pages/diensten/diensten.component').then((m) => m.DienstenComponent),
    data: {
      titleKey: 'seo.services.title',
      descriptionKey: 'seo.services.description',
      canonicalPath: '/diensten',
    },
  },
  {
    path: 'expertise',
    loadComponent: () =>
      import('./pages/expertise/expertise.component').then((m) => m.ExpertiseComponent),
    data: {
      titleKey: 'seo.expertise.title',
      descriptionKey: 'seo.expertise.description',
      canonicalPath: '/expertise',
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      titleKey: 'seo.contact.title',
      descriptionKey: 'seo.contact.description',
      canonicalPath: '/contact',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
