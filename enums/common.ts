export enum LOCALE {
  EN = 'en',
  VI = 'vi',
}

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum PASSWORD_LENGTH {
  MAX = 12,
  MIN = 6,
}

export enum NAME_LENGTH {
  MAX = 50,
  MIN = 2,
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export enum STATUS {
  ACTIVE = 1,
  BLOCKED = 2,
}

export enum PLAYLIST_STATUS {
  OPEN = 'Open',
  LOCK = 'Lock',
}

export enum USER_STATUS {
  OPEN = 'Active',
  LOCK = 'Inactive',
}

export enum SCREEN {
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1400,
  XXXL = 1600,
}

export enum DATE_FORMAT {
  DATE_ONLY = 'DD/MM/YYYY',
  FULL = 'HH:mm:ss DD/MM/YYYY',
}

export enum FILE_TYPE {
  FREE = 'NotPay',
  PREMIUM = 'Pay',
}
