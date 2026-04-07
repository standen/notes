import type {
  IPermissionsList,
  ISystemPermissions,
  ISystemMenuItem,
  IEntities,
} from "@/api/generated_types";

import permissions from "../../backend_django/api/json_schemes/system/PermissionsList.json";
import systemPermissions from "../../backend_django/api/json_schemes/system/SystemPermissions.json";

type entity = "notes" | "roles" | "users";
export const NO_DATA: Record<entity, string> = {
  roles: "Роли отсутствуют",
  users: "Пользователи отсутствуют",
  notes: "Заметки отсутствуют",
};

type errors =
  | "error401"
  | "error403"
  | "error404"
  | "required"
  | "regexp"
  | "notAllValidate"
  | "loginExists"
  | "roleExists";
export const ERRORS_TEXT: Record<errors, string> = {
  error401: "Требуется авторизация",
  error403: "Доступ к данной странице запрещен",
  error404: "Ошибка 404: страница не существует",
  required: "Поле является обязательным",
  regexp: "Недопустимое значение поля",
  notAllValidate: "Не все поля прошли валидацию",
  loginExists: "Данный логин занят",
  roleExists: "Данная роль уже существует",
};

const _PERMISSIONS = permissions.permissions_list as IPermissionsList;
const _SYSTEM_PERMISSIONS = systemPermissions as ISystemPermissions;

type TMenu = Record<IEntities, ISystemMenuItem>;

const menu: TMenu = {
  accounts: {
    title: "Аккаунты",
    url: "/",
    is_menu_item: true,
    permissions: [],
  },
  notes: {
    title: "Заметки",
    url: "/notes",
    is_menu_item: true,
    permissions: [],
  },
  events: {
    title: "События",
    url: "/events",
    is_menu_item: true,
    permissions: [],
  },
  pays: {
    title: "Платежи",
    url: "/pays",
    is_menu_item: true,
    permissions: [],
  },
  settings: {
    title: "Настройки",
    url: "/settings",
    is_menu_item: true,
    permissions: ["SETTINGS_SHOW_IN_MENU"],
  },
};

export const SYSTEM = {
  permissions_list: _PERMISSIONS.sort(),
  permissions: _SYSTEM_PERMISSIONS,
  menu,
};
