const EValidateEntities = [
  "login",
  "password",
  "roleName",
  "noteLink",
  "noteName",
] as const;

export type TValidateEntities = (typeof EValidateEntities)[number];
