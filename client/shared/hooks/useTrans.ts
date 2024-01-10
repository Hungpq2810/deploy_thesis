import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import en from 'shared/localization/en';
import vi from 'shared/localization/vi';

const useTrans = () => {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const [lang, setLang] = useState(locale);
  const trans = locale === 'vi' ? vi : en;
  function changeLanguage(lang: 'vi' | 'en') {
    router.push({ pathname, query }, asPath, { locale: lang });
    setLang(lang);
  }
  useEffect(() => {
    setLang(locale);
  }, [router]);
  return { trans, lang, changeLanguage };
};

export default useTrans;
