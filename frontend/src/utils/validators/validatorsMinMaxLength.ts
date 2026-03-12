import { type TValidateEntities } from "./types";

type TEntitiesMaxLength = Record<TValidateEntities, number>;

const MAX_LENGTH: TEntitiesMaxLength = {
  login: 32,
  password: 32,
  noteLink: 32,
  roleName: 24,
  noteName: 64,
};

const MIN_LENGTH: TEntitiesMaxLength = {
  login: 3,
  password: 3,
  noteLink: 3,
  roleName: 3,
  noteName: 3,
};

export { MAX_LENGTH, MIN_LENGTH };
