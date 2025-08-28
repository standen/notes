export const SETTINGS_ITEMS = ["Параметры", "Пользователи", "Роли"] as const;

export type TSettingsItems = (typeof SETTINGS_ITEMS)[number];
