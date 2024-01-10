import { DeleteOutlined } from '@ant-design/icons';
import { Col, Image, message, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import { userService } from '@/services/user.service';
import React from 'react';
import { feedbackService } from '@/services/feedback.service';
import { IFeedback } from '@/typeDefs/schema/feedback.type';

type Props = {};

const FeedbackManagement = ({}: Props) => {
  const { data: dataFeedback, refetch } = useQuery(['listFeedback'], () =>
    feedbackService.getAllFeedbackOrganizer()
  );
  const deleteMutation = useMutation({
    mutationKey: ['deleteMutation'],
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => {
      message.success('Xoá thành công');
      refetch();
    },
    onError() {
      message.error('Xoá không thành công');
    }
  });
  const columns: ColumnType<IFeedback>[] = [
    {
      title: '#',
      key: 'id',
      render: (value, record, index) => (
        <div>
          <p>{index + 1}</p>
        </div>
      )
    },
    {
      title: 'Tên hoạt động',
      dataIndex: 'name',
      render: (_, record) => <p>{record.activity?.name}</p>
    },
    {
      title: 'Người feedback',
      key: 'user',
      render: (_, record) => (
        <div className='w-1/3 flex justify-between items-center'>
          <Image
            preview={false}
            src={record.avatar}
            width={50}
            height={50}
            className='rounded-lg'
          />
          <p>{record.name}</p>
        </div>
      )
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Popconfirm
            okButtonProps={{ loading: deleteMutation.isLoading }}
            onConfirm={() => {
              deleteMutation.mutate(record.id);
            }}
            title={'Xoá'}
          >
            <DeleteOutlined className='cursor-pointer'></DeleteOutlined>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      {dataFeedback && dataFeedback.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý đánh giá</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search
                  className='bg-blue-300 rounded-lg'
                  placeholder='Tìm kiếm'
                  onSearch={() => {}}
                  enterButton
                />
              </div>
            </Col>
          </Row>
          <Table
            dataSource={dataFeedback.data.data.feedbacks}
            columns={columns}
          />
        </React.Fragment>
      )}
    </>
  );
};
FeedbackManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default FeedbackManagement;
