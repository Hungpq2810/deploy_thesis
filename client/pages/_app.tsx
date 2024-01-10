import { Shield } from '@/config/Shield';
import { APP_THEME } from '@/constant/AppConstant';
import useTheme from '@/hooks/useTheme';
import { store } from '@/store/store';
import { ConfigProvider } from 'antd';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import BlankLayout from '@/layouts/BlankLayout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 2 } }
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Boostrap = ({
  children,
  getLayout
}: {
  children: React.ReactElement;
  getLayout: (page: ReactElement) => ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    <ConfigProvider theme={APP_THEME.theme[theme]}>
      {getLayout(children)}
    </ConfigProvider>
  );
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <BlankLayout>{page}</BlankLayout>);
  return (
    <>
      <Head>
        <title>HVMS - Hust Volunteer Management System</title>
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Shield>
            <Boostrap getLayout={getLayout}>
              <Component {...pageProps} />
            </Boostrap>
          </Shield>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
