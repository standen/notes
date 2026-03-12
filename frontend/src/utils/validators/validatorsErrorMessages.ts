import { MAX_LENGTH, MIN_LENGTH } from "./validatorsMinMaxLength";

import { type TValidateEntities } from "./types";

type TEntitiesErrorMessage = Record<TValidateEntities, string>;

export const ERROR_MESSAGES: TEntitiesErrorMessage = {
  login: `Логин может содержат символы английского латинского алфавита и цифры, но не может начинаться с цифры. Длина: ${MIN_LENGTH.login} - ${MAX_LENGTH.login}.`,
  password: `Пароль может содержат символы русского и английского латинского алфавитов, цифры и спец. символы. Длина: ${MIN_LENGTH.password} - ${MAX_LENGTH.password}.`,
  noteLink: ``,
  noteName: ``,
  roleName: ``,
};
