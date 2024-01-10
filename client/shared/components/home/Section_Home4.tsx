import { IActivity } from '@/typeDefs/schema/activity.type';
import { Avatar, Badge, Button, Card } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
const { Meta } = Card;
type Props = {
  activities: IActivity[] | undefined;
};
const Section_Home4 = ({ activities }: Props) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>
          Các hoạt động sắp tới
        </h1>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5'>
        {activities &&
          activities.map((item: IActivity) => (
            <Card
              key={item.id}
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
                avatar={<Avatar src='item.image' />}
                title={item.name}
                description={
                  <div className='flex justify-between items-center'>
                    <p>Tổ chức: {item.creator}</p>
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

export default Section_Home4;
