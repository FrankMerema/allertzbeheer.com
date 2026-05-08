import { Routes } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { DienstenComponent } from './pages/diensten/diensten.component';
import { ExpertiseComponent } from './pages/expertise/expertise.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Allertz Beheer B.V.',
  },
  {
    path: 'diensten',
    component: DienstenComponent,
    title: 'Diensten | Allertz Beheer B.V.',
  },
  {
    path: 'expertise',
    component: ExpertiseComponent,
    title: 'Expertise | Allertz Beheer B.V.',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact | Allertz Beheer B.V.',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
