import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home | Allertz Beheer B.V.',
  },
  {
    path: 'diensten',
    loadComponent: () =>
      import('./pages/diensten/diensten.component').then((m) => m.DienstenComponent),
    title: 'Diensten | Allertz Beheer B.V.',
  },
  {
    path: 'expertise',
    loadComponent: () =>
      import('./pages/expertise/expertise.component').then((m) => m.ExpertiseComponent),
    title: 'Expertise | Allertz Beheer B.V.',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact | Allertz Beheer B.V.',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
