import { APP_SAVE_KEYS, APP_SETTINGS } from '@/constant/AppConstant';
import useTheme from '@/hooks/useTheme';
import useTrans from '@/hooks/useTrans';
import DashboardLayout from '@/layouts/DashboardLayout';
import { LocalStorageHelper } from '@/utils/localStorage';
import { Card, Radio, RadioChangeEvent, Typography } from 'antd';
import Head from 'next/head';
const SettingPage = () => {
  const { trans, lang, changeLanguage } = useTrans();
  const { theme } = useTheme();
  function onChangeTheme(e: RadioChangeEvent) {
    LocalStorageHelper.set(APP_SAVE_KEYS.THEME, e.target.value);
    window.location.reload();
  }
  return (
    <>
      <Head>
        <title>{trans.page.setting.pageTitle}</title>
      </Head>
      <Card>
        <div className='flex flex-col gap-6 '>
          <div className='flex gap-10 items-center'>
            <Typography className='font-bold w-20'>
              {trans.page.setting.theme}
            </Typography>
            <Radio.Group value={theme} onChange={(e) => onChangeTheme(e)}>
              <Radio value={APP_SETTINGS.THEME.LIGHT}>
                {trans.page.setting.light}
              </Radio>
              <Radio value={APP_SETTINGS.THEME.NIGHT}>
                {trans.page.setting.dark}
              </Radio>
            </Radio.Group>
          </div>
          <div className='flex gap-10 items-center'>
            <Typography className='font-bold w-20'>
              {trans.page.setting.language}
            </Typography>
            <Radio.Group
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <Radio value={APP_SETTINGS.LANGUAGE.EN}>
                {trans.page.setting.enLang}
              </Radio>
              <Radio value={APP_SETTINGS.LANGUAGE.VI}>
                {trans.page.setting.vnLang}
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </Card>
    </>
  );
};
SettingPage.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default SettingPage;
