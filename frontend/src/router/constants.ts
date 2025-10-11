import type { TNavMenu } from "@/router/types";

export const NavMenu: TNavMenu = {
  PageAccounts: {
    title: "Аккаунты",
    url: "/",
    isMenuItem: true,
  },
  PageNotes: {
    title: "Заметки",
    url: "/notes",
    isMenuItem: true,
  },
  PageNoteEngine: {
    title: "Редактирование заметки",
    url: "/editnote",
    isMenuItem: false,
  },
  PageBirthdays: {
    title: "События",
    url: "/birthdays",
    isMenuItem: true,
  },
  PageSettings: {
    title: "Настройки",
    url: "/settings",
    isMenuItem: true,
  },
};
