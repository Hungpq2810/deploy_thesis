import { activityService } from '@/services/activity.service';
import { IActivity } from '@/typeDefs/schema/activity.type';
import { Avatar, Badge, Button, Card } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
const { Meta } = Card;

const ActivityPage = () => {
  const router = useRouter();
  const { query } = router;
  const [key, setKey] = useState('');
  const [filterActivity, setFilterActivity] = useState<
    IActivity[] | undefined
  >();
  const { data: dataActivitySearch, refetch: refetchSearch } = useQuery(
    ['listActivitySearch'],
    () => activityService.searchActivity(key as string),
    { enabled: key !== '' }
  );
  const { data: dataActivity, refetch } = useQuery(['listActivity'], () =>
    activityService.getAllActivity()
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyValue = params.get('key');
    setKey(keyValue || (query.key as string) || '');
    refetchSearch();
  }, []);
  useEffect(() => {
    if (key === '') {
      if (
        dataActivity &&
        dataActivity.data &&
        dataActivity.data.data.activities
      ) {
        const sortedActivities = [...dataActivity.data.data.activities].sort(
          (a, b) => {
            if (a.status === 0 && b.status !== 0) {
              return -1;
            } else if (a.status !== 0 && b.status === 0) {
              return 1;
            }
            return 0;
          }
        );
        setFilterActivity(sortedActivities);
      }
    } else {
      refetchSearch();
      setFilterActivity(dataActivitySearch?.data.data.activities);
    }
  }, [dataActivity, key]); // Chỉ gọi lại khi dataActivity thay đổi

  return (
    <React.Fragment>
      <Head>
        <title>Danh sách hoạt động</title>
        <meta name='description' content='Danh sách hoạt động' />
        <meta name='keywords' content='Activity Management' />
      </Head>
      <h1 className='flex flex-col justify-center items-center gap-10 mb-24 text-6xl leading-8 text-bold text-[#0F147F]'>
        Danh sách hoạt động
      </h1>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5'>
        {filterActivity &&
          filterActivity.map((item) => (
            <Card
              key={item.id}
              style={{ width: 400 }}
              cover={
                <div className='col-span-1 w-full'>
                  <Badge.Ribbon
                    text={item.status === 0 ? 'Đang mở' : 'Đã đóng'}
                    color={item.status === 0 ? 'green' : 'red'}
                  >
                    <img className='w-full' height={250} src={item.image} />
                  </Badge.Ribbon>
                </div>
              }
            >
              <Meta
                avatar={<Avatar src={item.image} />}
                title={item.name}
                description={
                  <div className='flex justify-between items-center'>
                    <p>Tổ chức: {item.inforOrganizer?.name}</p>
                    <Button onClick={() => router.push(`/activity/${item.id}`)}>
                      Xem chi tiết
                    </Button>
                  </div>
                }
              />
            </Card>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ActivityPage;
