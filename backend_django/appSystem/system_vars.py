ALLOWED_ACTIONS = sorted([
    "ACCOUNTS_SHOW_IN_MENU",
    "ACCOUNTS_READ",
    "ACCOUNTS_CREATE",
    "ACCOUNTS_EDIT",
    "ACCOUNTS_DELETE",
    
    "NOTES_SHOW_IN_MENU",
    "NOTES_READ",
    "NOTES_CREATE",
    "NOTES_EDIT",
    "NOTES_DELETE",
    
    "EVENTS_SHOW_IN_MENU",
    "EVENTS_READ",
    "EVENTS_CREATE",
    "EVENTS_EDIT",
    "EVENTS_DELETE",
    
    "PAYS_SHOW_IN_MENU",
    "PAYS_READ",
    "PAYS_CREATE",
    "PAYS_EDIT",
    "PAYS_DELETE",
    
    "SETTINGS_SHOW_IN_MENU",
    
    "SETTINGS_ROLES_SHOW_IN_TABS",
    "SETTINGS_ROLES_READ",
    "SETTINGS_ROLES_CREATE",
    "SETTINGS_ROLES_EDIT",
    "SETTINGS_ROLES_DELETE",
    
    "SETTINGS_USERS_SHOW_IN_TABS",
    "SETTINGS_USERS_READ",
    "SETTINGS_USERS_CREATE",
    "SETTINGS_USERS_EDIT",
    "SETTINGS_USERS_DELETE",
    
    "SETTINGS_PAYS_SHOW_IN_TABS",
    "SETTINGS_PAYS_CATEGORY_READ",
    "SETTINGS_PAYS_CATEGORY_CREATE",
    "SETTINGS_PAYS_CATEGORY_EDIT",
    "SETTINGS_PAYS_CATEGORY_DELETE"
])

SYSTEM_PERMISSIONS = {
  "accounts": {
    "show_in_menu": ["ACCOUNTS_SHOW_IN_MENU"],
    "read": ["ACCOUNTS_READ"],
    "create": ["ACCOUNTS_CREATE"],
    "edit": ["ACCOUNTS_EDIT"],
    "delete": ["ACCOUNTS_DELETE"]
  },
  "notes": {
    "show_in_menu": ["NOTES_SHOW_IN_MENU"],
    "read": ["NOTES_READ"],
    "create": ["NOTES_CREATE"],
    "edit": ["NOTES_EDIT"],
    "delete": ["NOTES_DELETE"]
  },
  "events": {
    "show_in_menu": ["EVENTS_SHOW_IN_MENU"],
    "read": ["EVENTS_READ"],
    "create": ["EVENTS_CREATE"],
    "edit": ["EVENTS_EDIT"],
    "delete": ["EVENTS_DELETE"]
  },
  "pays": {
    "show_in_menu": ["PAYS_SHOW_IN_MENU"],
    "read": ["PAYS_READ"],
    "create": ["PAYS_CREATE"],
    "edit": ["PAYS_EDIT"],
    "delete": ["PAYS_DELETE"]
  },
  "settings": {
    "show_in_menu": ["SETTINGS_SHOW_IN_MENU"],
    "roles": {
      "show_in_tabs": ["SETTINGS_ROLES_SHOW_IN_TABS"],
      "read": ["SETTINGS_ROLES_READ"],
      "create": ["SETTINGS_ROLES_CREATE"],
      "edit": ["SETTINGS_ROLES_EDIT"],
      "delete": ["SETTINGS_ROLES_DELETE"]
    },
    "users": {
      "show_in_tabs": ["SETTINGS_USERS_SHOW_IN_TABS"],
      "read": ["SETTINGS_USERS_READ"],
      "create": ["SETTINGS_USERS_CREATE"],
      "edit": ["SETTINGS_USERS_EDIT"],
      "delete": ["SETTINGS_USERS_DELETE"]
    },
    "pays": {
      "show_in_tabs": ["SETTINGS_PAYS_SHOW_IN_TABS"],
      "category": {
        "read": ["SETTINGS_PAYS_CATEGORY_READ"],
        "create": ["SETTINGS_PAYS_CATEGORY_CREATE"],
        "edit": ["SETTINGS_PAYS_CATEGORY_EDIT"],
        "delete": ["SETTINGS_PAYS_CATEGORY_DELETE"]
      }
    }
  }
}

SYSTEM_MENU = {
  "accounts": {
    "title": "Аккаунты",
    "url": "/",
    "is_menu_item": True,
    "permissions": []
  },
  "notes": {
    "title": "Заметки",
    "url": "/notes",
    "is_menu_item": True,
    "permissions": []
  },
  "events": {
    "title": "События",
    "url": "/events",
    "is_menu_item": True,
    "permissions": []
  },
  "pays": {
    "title": "Платежи",
    "url": "/pays",
    "is_menu_item": True,
    "permissions": []
  },
  "settings": {
    "title": "Настройки",
    "url": "/settings",
    "is_menu_item": True,
    "permissions": ["SETTINGS_SHOW_IN_MENU"]
  }
}