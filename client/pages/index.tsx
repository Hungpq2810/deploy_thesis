import _ from 'lodash';
import React, { Fragment } from 'react';
import { NextPageWithLayout } from './_app';
import useTrans from '@/hooks/useTrans';
import Head from 'next/head';
import BlankLayout from '@/layouts/BlankLayout';
import Section_Home1 from '@/components/home/Section_Home1';
import Section_Home2 from '@/components/home/Section_Home2';
import Section_Home3 from '@/components/home/Section_Home3';
import Section_Home4 from '@/components/home/Section_Home4';
import Section_Home5 from '@/components/home/Section_Home5';
import { useQuery } from 'react-query';
import { activityService } from '@/services/activity.service';
import { IActivity } from '@/typeDefs/schema/activity.type';
import { feedbackService } from '@/services/feedback.service';
import { IFeedback } from '@/typeDefs/schema/feedback.type';

const Home: NextPageWithLayout = () => {
  const { data: dataActivity } = useQuery(
    ['listActivity'],
    () => activityService.getAllActivity(),
    {
      select(data) {
        const activityOpen = data.data.data.activities.filter(
          (acitivty) => acitivty.status === 0
        );
        return activityOpen;
      }
    }
  );
  const { data: dataFeedback } = useQuery(
    ['listFeedback'],
    () => feedbackService.getAllFeedback(),
    {
      select(data) {
        const filterDataFeedbackSystem = data.data.data.feedbacks.filter(
          (feedback) => feedback.activity_id === null
        );
        return filterDataFeedbackSystem;
      }
    }
  );
  const { trans } = useTrans();
  return (
    <Fragment>
      <Head>
        <title>{trans.page.dashboard.pageTitle}</title>
      </Head>
      <Section_Home1 />
      <Section_Home2 />
      <Section_Home3 />
      <Section_Home4 activities={dataActivity as unknown as IActivity[]} />
      <Section_Home5 feedbacks={dataFeedback as unknown as IFeedback[]} />
    </Fragment>
  );
};
Home.getLayout = (children) => <BlankLayout>{children}</BlankLayout>;
export default Home;
