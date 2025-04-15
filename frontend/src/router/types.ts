import React from "react";

export enum ELinks {
  accounts = "",
  settings = "settings",
  notes = "notes",
  birthdays = "birthdays",
}

export type TPage = {
  description: string;
  link: string;
  title: string;
  icon: React.ReactNode;
};
