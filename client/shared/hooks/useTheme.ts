import { APP_SAVE_KEYS } from '@/constant/AppConstant';
import { LocalStorageHelper } from '@/utils/localStorage';
import React, { useDebugValue, useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setTheme(LocalStorageHelper.get(APP_SAVE_KEYS.THEME));
  }, []);
  return { theme };
}
