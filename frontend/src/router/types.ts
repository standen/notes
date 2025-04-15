import React from "react";

export enum ELinks {
  accounts = "",
  settings = "settings",
  notes = "notes",
  birthdays = "birthdays",
}

export enum ENavbarPages {
  PageAccounts,
  PageNotes,
  PageBirthdays,
  PageSettings,
  Page404,
  PageLogin,
}

export type TPage = {
  description: string;
  link: string;
  title?: string;
  icon?: React.ReactNode;
};

export type TNavbarPage = Record<keyof typeof ENavbarPages, TPage>;
