import Head from 'next/head';
import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import { IActivity } from '@/typeDefs/schema/activity.type';
import BlankLayout from '@/layouts/BlankLayout';
import {
  Button,
  Avatar,
  List,
  Badge,
  message,
  Form,
  Input,
  Card,
  Space,
  Rate
} from 'antd';
import { useMutation, useQuery } from 'react-query';
import { activityService } from '@/services/activity.service';
import { useAppSelector } from '@/hooks/useRedux';
import { useRouter } from 'next/router';
import { feedbackService } from '@/services/feedback.service';
import { userService } from '@/services/user.service';
import dayjs from 'dayjs';

type Props = {
  activity: IBaseResponse<IActivity>;
};
const DetailActivity = ({ activity }: Props) => {
  const [rate, setRate] = useState(0);
  const { data: userDetail, refetch } = useQuery(
    ['userDetail'],
    () => userService.getUserByAuth(),
    {
      select(data) {
        return data.data.data.activityApplied;
      }
    }
  );
  const currentDate = new Date();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.appSlice); 

  const newFeedbackMutation = useMutation({
    mutationKey: 'newFeedback',
    mutationFn: (body: {
      activity_id: number;
      title: string;
      content: string;
      rate: number;
    }) => feedbackService.newActivity(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success('Tạo thành công');
      window.location.reload();
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công');
    }
  });

  const applyActivityMutation = useMutation({
    mutationKey: 'applyActivity',
    mutationFn: (body: { activity_id: number }) =>
      activityService.applyActivity(body),
    onSuccess(data, _variables, _context) {
      if (data) {
        message.success('Đăng ký thành công');
        refetch();
      }
    },
    onError(error, variables, context) {
      message.error('Đăng ký không thành công');
    }
  });

  const cancelActivityMutation = useMutation({
    mutationKey: 'cancelActivity',
    mutationFn: (body: { activity_id: number }) =>
      activityService.cancelActivity(body),
    onSuccess(data, _variables, _context) {
      if (data) {
        message.success('Hủy đăng ký thành công');
        refetch();
      }
    },
    onError(error, variables, context) {
      // console.log(error);
      
      message.error('Hủy đăng ký không thành công');
    }
  });

  function handleNewFeedback(value: any) {
    const body = {
      activity_id: activity.data.id,
      title: value.title,
      content: value.content,
      rate: rate
    };
    newFeedbackMutation.mutate(body);
  }
  if (!activity) return <React.Fragment></React.Fragment>;
  console.log(user);
  
  return (
    <React.Fragment>
      <Head>
        <title>Chi tiết hoạt động</title>
        <meta name='description' content='Hoạt động chi tiết' />
        <meta name='keywords' content='Activity Management' />
      </Head>
      <section className='w-full h-full grid grid-cols-1 gap-10'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-24'>
          <div className='col-span-1 w-full'>
            <Badge.Ribbon
              text={activity.data.status === 0 ? 'Đang mở' : 'Đã đóng'}
              color={activity.data.status === 0 ? 'green' : 'red'}
            >
              <img className='w-full' height={500} src={activity.data.image} />
            </Badge.Ribbon>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
              <h1>Tên: {activity.data.name}</h1>
              <h2>Địa điểm: {activity.data.location}</h2>
            </div>
            <div className='flex flex-col'>
              <h3>Kỹ năng</h3>
              <div className='flex flex-wrap justify-start items-start gap-3'>
                {activity.data.skillsActivity?.map((skill, index) => (
                  <Badge
                    key={index}
                    className='site-badge-count-109'
                    count={skill.name}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                ))}
              </div>
              <h3>Đơn vị tổ chức: {activity.data.inforOrganizer?.name}</h3>
            </div>
            <span style={{ whiteSpace: 'pre-line' }}>
              <h3>Mô tả hoạt động:</h3>
              <br></br>
              {activity.data.description}
            </span>
            <div className='w-full flex justify-between items-center'>
              <h3>
                Số lượng tình nguyện viên đã được duyệt:{' '}
                {activity.data.num_of_accepted}
              </h3>
              {/* dayjs(activity.data.register_from).format('DD/MM/YYYY') */}
              <h3>
                Số lượng tình nguyện viên tối đa: {activity.data.max_of_volunteers}
              </h3>
            </div>
            <div className='w-full flex justify-between items-center'>
              <h3>
                Thời gian bắt đầu đăng ký:{' '}
                {dayjs(activity.data.register_from).format('DD/MM/YYYY')}
              </h3>
              <h3>
                Thời gian kết thúc đăng ký:{' '}
                {dayjs(activity.data.register_to).format('DD/MM/YYYY')}
              </h3>
            </div>
            <div className='w-full flex justify-between items-center'>
              <h3>
                Thời gian bắt đầu sự kiện:{' '}
                {dayjs(activity.data.start_date).format('DD/MM/YYYY')}
              </h3>
              <h3>
                Thời gian kết thúc sự kiện:{' '}
                {dayjs(activity.data.end_date).format('DD/MM/YYYY')}
              </h3>
            </div>
            {activity.data.num_of_accepted ===
              activity.data.max_of_volunteers ||
            new Date(activity.data.register_to).getTime() < currentDate.getTime() ? (
              <>
                <p>
                  Đã đủ tình nguyện viên tham gia hoặc hoạt động hết hạn tham
                  gia
                </p>
              </>
            ) : (
              <>
                {activity.data.status === 0 && user && user.role_id === 1 ? (
                  <>
                    {userDetail && userDetail.some((item: any) => item.activity_id === activity.data.id) ? (
                      <>
                        <p>Bạn đã đăng ký</p>
                        <Button onClick={() => cancelActivityMutation.mutate({ activity_id: activity.data.id })}>
                          Huỷ đăng ký
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          applyActivityMutation.mutate({ activity_id: activity.data.id })
                        }}
                      >
                        Đăng ký
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    onClick={() =>
                      !user ? router.push('/login') : router.push('/activity')
                    }
                  >
                    Bạn không phải tình nguyện viên hoặc chưa đăng nhập
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <List
          itemLayout='horizontal'
          dataSource={activity.data.feedback}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span>{item.name}</span>}
                description={
                  <div>
                    <Space>
                      <Rate disabled value={item.rate} />
                      {rate ? <span>{[rate - 1]}</span> : ''}
                    </Space>
                    <p>Tiêu đề: {item.title}</p>
                    <p>{item.content}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        {userDetail &&
        userDetail.some(
          (item: any) =>
            item.activity_id === activity.data.id && item.status === 3
        ) ? (
          <Card title='Feedback'>
            <Form
              name='newFeedback'
              initialValues={{ remember: true }}
              onFinish={handleNewFeedback}
              autoComplete='off'
              layout='vertical'
            >
              <Form.Item
                label='Tiêu đề'
                name='title'
                rules={[{ required: true, message: 'Chưa điền tiêu đề' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Nội dung'
                name='content'
                rules={[{ required: true, message: 'Chưa điền nội dung' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label='Đánh giá' name='rate'>
                <Rate onChange={setRate} value={rate} />
                {rate ? <span>{[rate]}</span> : ''}
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button htmlType='submit'>Gửi đánh giá</Button>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          <></>
        )}
      </section>
    </React.Fragment>
  );
};
DetailActivity.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);
export default DetailActivity;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id;
  if (id) {
    try {
      const responseActivity = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/activities/${id}`
      );
      const activity = await responseActivity.json();
      return {
        props: {
          activity
        }
      };
    } catch (error) {
      return {
        props: {
          activity: null,
          error: 'Failed to fetch activity data'
        }
      };
    }
  } else {
    return {
      props: {},
      notFound: true
    };
  }
};
export const getStaticPaths: GetStaticPaths = async (_ctx) => {
  return {
    paths: [],
    fallback: true
  };
};
