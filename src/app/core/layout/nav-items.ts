export interface NavItem {
  readonly route: string;
  readonly labelKey: string;
  readonly exact: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { route: '/', labelKey: 'nav.home', exact: true },
  { route: '/diensten', labelKey: 'nav.services', exact: false },
  { route: '/expertise', labelKey: 'nav.expertise', exact: false },
  { route: '/contact', labelKey: 'nav.contact', exact: false },
];
