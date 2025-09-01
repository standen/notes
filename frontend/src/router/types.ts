const PAGE_PREFIX = "Page";
export const PAGES_NAMES = [
  `${PAGE_PREFIX}Accounts`,
  `${PAGE_PREFIX}Notes`,
  `${PAGE_PREFIX}Birthdays`,
  `${PAGE_PREFIX}Settings`,
  `${PAGE_PREFIX}NoteEngine`,
] as const;

export type TMenuPagesNames = (typeof PAGES_NAMES)[number];

export type TNavMenuParams = {
  title: string;
  url: string;
  isMenuItem: boolean;
};

export type TNavMenu = Record<TMenuPagesNames, TNavMenuParams>;
