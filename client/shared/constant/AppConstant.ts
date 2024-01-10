import { ThemeConfig } from 'antd';

export const APP_URL = {
  ADMIN_MANAGE: '/admin/system_administrator',
  ADMIN_MANAGE_ROLE: '/admin/system_administrator/users_role',
  ADMIN_MANAGE_ROLE_CREATE: '/admin/system_administrator/users_role/create',
  ADMIN_MANAGE_ROLE_EDIT: '/admin/system_administrator/users_role/update/',
  ADMIN_MANAGE_ACCOUNT: '/admin/system_administrator/users_account',
  ADMIN_MANAGE_ACCOUNT_CREATE:
    '/admin/system_administrator/users_account/create',
  ADMIN_MANAGE_ACCOUNT_EDIT:
    '/admin/system_administrator/users_account/update/',
  ADMIN_MANAGE_PERMISSION: '/admin/system_administrator/users_permission',
  ADMIN_MANAGE_LOG: '/admin/system_administrator/users_log',
  ADMIN_MANAGE_MENU: '/admin/system_administrator/menu',
  ADMIN_MANAGE_MENU_CREATE: '/admin/system_administrator/menu/create',
  ADMIN_MANAGE_MENU_UPDATE: '/admin/system_administrator/menu/update/',
  ADMIN_MANAGE_DATA: '/admin/table/bidv',
  ADMIN_MANAGE_TRANSACTION_DATA: '/admin/table/bidv/transactions',
  ADMIN_MANAGE_CUSTOMER_DATA: '/admin/table/bidv/customers',
  ADMIN_MANAGE_ACCOUNT_DATA: '/admin/table/bidv/accounts',
  SETTINGS: '/settings'
};

export const APP_THEME = {
  theme: {
    light: {
      token: {
        colorPrimary: '#1677FF',
        colorBgBase: '#fff',
        colorText: '#000',
        colorTextPlaceholder: '#000'
      },
      components: {
        Typography: {
          colorText: '#000'
        }
      }
    } as ThemeConfig,
    dark: {
      token: {
        colorPrimary: '#F3732A',
        colorBgBase: 'rgb(33, 33, 52)',
        colorText: '#fff',
        colorTextPlaceholder: '#fff'
      },
      components: {
        Typography: {
          colorText: '#fff'
        }
      }
    } as ThemeConfig
  }
};

export const APP_SETTINGS = {
  THEME: {
    NIGHT: 'dark',
    LIGHT: 'light'
  },
  LANGUAGE: {
    EN: 'en',
    VI: 'vi'
  }
};

export const APP_SAVE_KEYS = {
  KEYS: 'keys',
  SESSION_KEY: 'sessionKey',
  ROLE: 'role',
  TIME_EXPIRED: 'timeExpired',
  THEME: 'THEME',
  LANGUAGE: 'LANGUAGE'
};

export const APP_REGEX = {
  VN_PHONENUMBER: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
};
