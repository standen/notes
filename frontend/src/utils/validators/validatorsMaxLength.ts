import { type TValidateEntities } from "./types";

type TEntitiesMaxLength = Record<TValidateEntities, number>;

export const MAX_LENGTH: TEntitiesMaxLength = {
  login: 32,
  password: 32,
  noteLink: 32,
  roleName: 24,
  noteName: 64,
};
