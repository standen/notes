const PAGE_PREFIX = "Page";
export const PAGES_NAMES: string[] = [
  `${PAGE_PREFIX}Accounts`,
  `${PAGE_PREFIX}Notes`,
  `${PAGE_PREFIX}Birthdays`,
  `${PAGE_PREFIX}Settings`,
  `${PAGE_PREFIX}404`,
] as const;

export type TMenuPagesNames = (typeof PAGES_NAMES)[number];

export type TNavMenuParams = { title: string; url: string };

export type TNavMenu = Record<TMenuPagesNames, TNavMenuParams>;
