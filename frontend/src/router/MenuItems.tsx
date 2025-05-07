import { TNavbarPage } from "./types";

export const MenuItems: TNavbarPage = {
  PageAccounts: {
    description: "Страница с аккаунтами",
    link: "",
    title: "Аккаунты",
    icon: <i className="fa-solid fa-user" />,
  },
  PageNotes: {
    description: "Страница с заметками",
    link: "notes",
    title: "Заметки",
    icon: <i className="fa-solid fa-file-pen" />,
  },
  PageBirthdays: {
    description: "Страница с днями рождения",
    link: "birthdays",
    title: "Дни рождения",
    icon: <i className="fa-solid fa-cake-candles" />,
  },
  PagePayments: {
    description: "Страница с оплатой ЖКХ",
    link: "payments",
    title: "Оплата ЖКХ",
    icon: <i className="fa-solid fa-money-bill-1-wave" />,
  },
  PageSettings: {
    description: "Страница с настройками",
    link: "settings",
    title: "Настройки",
    icon: <i className="fa-solid fa-gear" />,
  },
  PageLogin: {
    description: "Страница авторизации",
    link: "login",
  },
  Page404: {
    description: "Страница ошибки 404",
    link: "*",
  },
};
