// ** React Imports
import useTrans from '@/hooks/useTrans';
import BlankLayout from '@/layouts/BlankLayout';
import { Button, Result } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

const Error401 = () => {
  const { trans } = useTrans();
  return (
    <>
      <Head>
        <title>{trans.page[403].pageTitle}</title>
      </Head>
      <Result
        status='403'
        title='403'
        subTitle={trans.page[403].pageTitle}
        extra={
          <Button type='primary'>
            <Link href={'/'}>{trans.common.goBackHome}</Link>{' '}
          </Button>
        }
      />
    </>
  );
};

Error401.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);
export default Error401;
