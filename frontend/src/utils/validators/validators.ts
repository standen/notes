import { ERROR_MESSAGES } from "./validatorsErrorMessages";
import { POSSIBLE_SYMBOLS, SYMBOLS } from "./validatorsPossibleSymbols";
import { MAX_LENGTH } from "./validatorsMaxLength";

import { type TValidateEntities } from "./types";

type TValidateParams = {
  check: (indata: string) => boolean;
  errorText: string;
};

const validateLogin = (login: string): boolean => {
  if (!login) {
    return false;
  }

  if (login.length > MAX_LENGTH.login) {
    return false;
  }

  if (!SYMBOLS.en.includes(login[0])) {
    return false;
  }

  if (!login.split("").every((item) => POSSIBLE_SYMBOLS.login.includes(item))) {
    return false;
  }

  return true;
};

const validatePassword = (password: string): boolean => {
  if (!password) {
    return false;
  }

  if (password.length > MAX_LENGTH.password) {
    return false;
  }

  return password
    .split("")
    .every((item) => POSSIBLE_SYMBOLS.password.includes(item));
};

const validateRoleName = (role: string): boolean => {
  return true;
};

const validateNoteLink = (noteLink: string): boolean => {
  return true;
};

const validateNoteName = (noteName: string): boolean => {
  return true;
};

export const validate: Record<TValidateEntities, TValidateParams> = {
  login: {
    check: validateLogin,
    errorText: ERROR_MESSAGES.login,
  },
  password: {
    check: validatePassword,
    errorText: ERROR_MESSAGES.password,
  },
  noteLink: {
    check: validateNoteLink,
    errorText: ERROR_MESSAGES.noteLink,
  },
  noteName: {
    check: validateNoteName,
    errorText: ERROR_MESSAGES.noteName,
  },
  roleName: {
    check: validateRoleName,
    errorText: ERROR_MESSAGES.roleName,
  },
};
