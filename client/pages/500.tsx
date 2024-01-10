// ** React Imports
import useTrans from '@/hooks/useTrans';
import BlankLayout from '@/layouts/BlankLayout';
import { Button, Result } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

const Error500 = () => {
  const { trans } = useTrans();
  return (
    <>
      <Head>
        <title>{trans.page[500].pageTitle}</title>
      </Head>
      <Result
        status='500'
        title='500'
        subTitle={trans.page[500].pageTitle}
        extra={
          <Button type='primary'>
            <Link href={'/'}>{trans.common.goBackHome}</Link>{' '}
          </Button>
        }
      />
    </>
  );
};
Error500.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);

export default Error500;
