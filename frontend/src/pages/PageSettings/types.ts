export const SETTINGS_ITEMS = ["Пользователи", "Роли"] as const;

export type TSettingsItems = (typeof SETTINGS_ITEMS)[number];
