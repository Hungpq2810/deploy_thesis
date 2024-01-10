import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, message, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import React from 'react';
import { volunteerService } from '@/services/volunteer.service';
import { IRequestVolunteer } from '@/typeDefs/schema/volunteer.type';

type Props = {};

const RequestVolunteerManagement = ({}: Props) => {
  const { data: dataRequestVolunteers, refetch } = useQuery(
    ['listRequestVolunteers'],
    () => volunteerService.getAllRequestVolunteer()
  );
  const updateMutation = useMutation({
    mutationKey: ['updateMutation'],
    mutationFn: (body: { user_id: number; status: number }) =>
      volunteerService.updateRequestVolunteer(body),
    onSuccess: () => {
      message.success('Cập nhật thành công');
      refetch();
    },
    onError() {
      message.error('Cập nhật không thành công');
    }
  });
  const columns: ColumnType<IRequestVolunteer>[] = [
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
      title: 'Người đăng ký',
      dataIndex: 'user_id',
      render: (_, record) => (
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <p>Tên: {record.name}</p>
          <p>Email: {record.email}</p>
          <p>Sđt: {record.phone}</p>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <p>
          {record.status === 0
            ? 'Phê duyệt'
            : record.status === 1
              ? 'Chưa phê duyệt'
              : 'Không phê duyệt'}
        </p>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          {record.status === 1 ? (
            <>
              <Popconfirm
                okButtonProps={{ loading: updateMutation.isLoading }}
                onConfirm={() => {
                  const body = {
                    user_id: record.user_id,
                    // status: record.status
                    status: 0
                  };
                  updateMutation.mutate(body);
                }}
                title={'Phê duyệt'}
              >
                <CheckOutlined className='cursor-pointer'></CheckOutlined>
              </Popconfirm>
              <Popconfirm
                okButtonProps={{ loading: updateMutation.isLoading }}
                onConfirm={() => {
                  const body = {
                    user_id: record.user_id,
                    status: 2
                  };
                  updateMutation.mutate(body);
                }}
                title={'Từ chối'}
              >
                <CloseOutlined className='cursor-pointer'></CloseOutlined>
              </Popconfirm>
            </>
          ) : (
            <></>
          )}
        </Space>
      )
    }
  ];

  return (
    <>
      {
        // dataRequestVolunteers &&
        // dataRequestVolunteers.data.data &&
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>
                Quản lý yêu cầu/tình nguyện viên
              </h1>
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
            dataSource={dataRequestVolunteers?.data.data.requestVolunteers}
            columns={columns}
          />
        </React.Fragment>
      }
    </>
  );
};
RequestVolunteerManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default RequestVolunteerManagement;
