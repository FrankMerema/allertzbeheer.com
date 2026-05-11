import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, startWith } from 'rxjs';

import { SiteFooterComponent } from './core/layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './core/layout/site-header/site-header.component';

const SITE_NAME = 'Allertz Beheer B.V.';
const SITE_URL = 'https://allertzbeheer.com';
const DEFAULT_DESCRIPTION =
  'Allertz Beheer B.V. begeleidt organisaties bij complexe veranderingsprocessen, medezeggenschap, toezicht en strategisch managementadvies.';
const SOCIAL_IMAGE_PATH = '/images/brand/social-preview.svg';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.updateSeoMetadata());
  }

  private updateSeoMetadata(): void {
    const activeRoute = this.getDeepestRoute(this.activatedRoute);
    const routeTitle = activeRoute.snapshot.title?.toString() ?? SITE_NAME;
    const description = activeRoute.snapshot.data['description'] ?? DEFAULT_DESCRIPTION;
    const canonicalPath = activeRoute.snapshot.data['canonicalPath'] ?? this.router.url;
    const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
    const socialImageUrl = new URL(SOCIAL_IMAGE_PATH, SITE_URL).toString();

    this.title.setTitle(routeTitle);
    this.updateCanonicalLink(canonicalUrl);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ property: 'og:title', content: routeTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'nl_NL' });
    this.meta.updateTag({ property: 'og:image', content: socialImageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: routeTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: socialImageUrl });
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    let activeRoute = route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    return activeRoute;
  }

  private updateCanonicalLink(url: string): void {
    let linkElement = this.document.head.querySelector('link[rel="canonical"]');

    if (!linkElement) {
      linkElement = this.document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      this.document.head.appendChild(linkElement);
    }

    linkElement.setAttribute('href', url);
  }
}
