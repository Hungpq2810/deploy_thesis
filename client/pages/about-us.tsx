import _ from 'lodash';
import React, { Fragment } from 'react';
import { NextPageWithLayout } from './_app';
import Head from 'next/head';
import BlankLayout from '@/layouts/BlankLayout';
import Section_AboutUs1 from '@/components/about_us/Section_AboutUs1';
import Section_AboutUs2 from '@/components/about_us/Section_AboutUs2';
const AboutUs: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Head>
        <title>Về chúng tôi</title>
      </Head>
      <Section_AboutUs1 />
      <Section_AboutUs2 />
    </Fragment>
  );
};
AboutUs.getLayout = (children) => <BlankLayout>{children}</BlankLayout>;
export default AboutUs;
