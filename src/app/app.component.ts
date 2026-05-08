import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly title = 'Allertzbeheer.com';
  protected readonly summary =
    'Production-ready Angular starter with pnpm, CSS-only styling, enforced quality gates, and GitHub Pages deployment.';
}
