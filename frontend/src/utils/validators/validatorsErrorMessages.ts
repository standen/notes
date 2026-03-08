import { MAX_LENGTH } from "./validatorsMaxLength";

import { type TValidateEntities } from "./types";

type TEntitiesErrorMessage = Record<TValidateEntities, string>;

export const ERROR_MESSAGES: TEntitiesErrorMessage = {
  login: `Логин может содержат символы английского латинского алфавита и цифры, но не может начинаться с цифры. Максимальная длина: ${MAX_LENGTH.login}`,
  password: `Пароль может содержат символы русского ианглийского латинского алфавитов, цифры и спец. символы. Максимальная длина: ${MAX_LENGTH.password}`,
  noteLink: ``,
  noteName: ``,
  roleName: ``,
};
