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
  PageEvents: {
    title: "События",
    url: "/events",
    isMenuItem: true,
  },
  PageSettings: {
    title: "Настройки",
    url: "/settings",
    isMenuItem: true,
  },
};
