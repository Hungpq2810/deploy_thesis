// ** React Imports
import useTrans from '@/hooks/useTrans';
import BlankLayout from '@/layouts/BlankLayout';
import { Button, Result } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

const Error404 = () => {
  const { trans } = useTrans();
  return (
    <>
      <Head>
        <title>{trans.page[404].pageTitle}</title>
      </Head>
      <Result
        status='404'
        title='404'
        subTitle={trans.page[404].pageTitle}
        extra={
          <Button type='primary'>
            <Link href={'/'}>{trans.common.goBackHome}</Link>{' '}
          </Button>
        }
      />
    </>
  );
};
Error404.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);
export default Error404;
