import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, startWith } from 'rxjs';

import { I18nService } from './core/i18n/i18n.service';
import { SiteFooterComponent } from './core/layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './core/layout/site-header/site-header.component';

const SITE_NAME = 'Allertz Beheer B.V.';
const DEFAULT_DESCRIPTION_KEY = 'seo.home.description';
const DEFAULT_TITLE_KEY = 'seo.home.title';
const SOCIAL_IMAGE_PATH = 'images/brand/social-preview.svg';

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
  private readonly i18n = inject(I18nService);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.updateSeoMetadata());

    effect(() => {
      this.i18n.language();
      this.updateSeoMetadata();
    });
  }

  private updateSeoMetadata(): void {
    const activeRoute = this.getDeepestRoute(this.activatedRoute);
    const titleKey = activeRoute.snapshot.data['titleKey'] ?? DEFAULT_TITLE_KEY;
    const descriptionKey = activeRoute.snapshot.data['descriptionKey'] ?? DEFAULT_DESCRIPTION_KEY;
    const routeTitle = this.i18n.translate(titleKey);
    const description = this.i18n.translate(descriptionKey);
    const canonicalPath = activeRoute.snapshot.data['canonicalPath'] ?? this.router.url;
    const siteBaseUrl = this.document.baseURI;
    const canonicalUrl = new URL(this.toAppRelativePath(canonicalPath), siteBaseUrl).toString();
    const socialImageUrl = new URL(SOCIAL_IMAGE_PATH, siteBaseUrl).toString();

    this.title.setTitle(routeTitle);
    this.updateCanonicalLink(canonicalUrl);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ property: 'og:title', content: routeTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({
      property: 'og:locale',
      content: this.i18n.language() === 'nl' ? 'nl_NL' : 'en_GB',
    });
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

  private toAppRelativePath(path: string): string {
    return path === '/' ? '' : path.replace(/^\/+/, '');
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
