import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home | Allertz Beheer B.V.',
    data: {
      description:
        'Allertz Beheer B.V. begeleidt organisaties bij complexe veranderingsprocessen, medezeggenschap, toezicht en strategisch managementadvies.',
      canonicalPath: '/',
    },
  },
  {
    path: 'diensten',
    loadComponent: () =>
      import('./pages/diensten/diensten.component').then((m) => m.DienstenComponent),
    title: 'Diensten | Allertz Beheer B.V.',
    data: {
      description:
        'Ontdek de diensten van Allertz Beheer B.V.: verandermanagement, bestuurlijke facilitering, medezeggenschap, toezicht en strategische begeleiding.',
      canonicalPath: '/diensten',
    },
  },
  {
    path: 'expertise',
    loadComponent: () =>
      import('./pages/expertise/expertise.component').then((m) => m.ExpertiseComponent),
    title: 'Expertise | Allertz Beheer B.V.',
    data: {
      description:
        'Lees meer over de expertise van Allertz Beheer B.V. in veranderingsprocessen, medezeggenschap, toezicht en organisatieontwikkeling.',
      canonicalPath: '/expertise',
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact | Allertz Beheer B.V.',
    data: {
      description:
        'Neem contact op met Allertz Beheer B.V. voor strategisch advies, bestuurlijke begeleiding, medezeggenschap of toezicht.',
      canonicalPath: '/contact',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
