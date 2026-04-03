const EValidateEntities = [
  "login",
  "password",
  "roleName",
  "noteLink",
  "noteName",
  "key",
] as const;

export type TValidateEntities = (typeof EValidateEntities)[number];
