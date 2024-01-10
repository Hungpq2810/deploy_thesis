import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Col, message, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import React, { useMemo } from 'react';
import { activityService } from '@/services/activity.service';
import { IAppliedVolunteer } from '@/typeDefs/schema/activity.type';
import { useAppSelector } from '@/hooks/useRedux';

type Props = {};

const ApplyActivityManagement = ({}: Props) => {
  const { user } = useAppSelector((state) => state.appSlice);
  const { data: dataActivity } = useQuery(
    ['listActivity'],
    () => activityService.getAllActivity(),
    {
      select(data) {
        return data.data.data.activities.filter(
          (activity) => activity.creator_id === +user!.id
        );
      }
    }
  );
  const { data: dataApplyActivity, refetch } = useQuery(
    ['listApplyActivity'],
    () => activityService.getAllApplyActivity(),
    {
      select(data) {
        const activityIdsAndCreatorIds =
          dataActivity &&
          dataActivity.map((activity) => ({
            activity_id: activity.id,
            creator_id: activity.creator_id
          }));
        if (!activityIdsAndCreatorIds) return;
        const currentApplyActivity = data.data.data.appliedVolunteers.filter(
          (appliedVolunteer) => {
            return activityIdsAndCreatorIds.some(
              ({ activity_id }) => activity_id === appliedVolunteer.activity_id
            );
          }
        );
        return currentApplyActivity;
      }
    }
  );
  const updateMutation = useMutation({
    mutationKey: ['updateMutation'],
    mutationFn: (body: { user_id: number; status: number }) =>
      activityService.updateApplyActivity(body),
    onSuccess: () => {
      message.success('Cập nhật thành công');
      refetch();
    },
    onError() {
      message.error('Cập nhật không thành công');
    }
  });

  const filterActivityByName: { text: string; value: string }[] = useMemo(() => {
    
  if (dataApplyActivity) {
    console.log(dataApplyActivity);
    

    return dataApplyActivity.map((item) => ({
      text: item.activity!.name,
      value: item.activity!.name
    }));
  } else {
    return [{
      text: '',
      value: ''
    }];
  }
  }, [dataApplyActivity]);

  const columns: ColumnType<IAppliedVolunteer>[] = [
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
        <div className='flex flex-col justify-start items-start gap-3'>
          <p>Tên: {record.name}</p>
          <p>Email: {record.email}</p>
          <p>SĐT: {record.phone}</p>
        </div>
      )
    },
    {
      title: 'Tên hoạt động',
      dataIndex: 'name_organizer',
      filters: filterActivityByName,
      render: (_, record) => <p>{record.activity?.name}</p>,
      // @ts-ignore
      onFilter: (value: string, record) =>
        record.activity?.name.indexOf(value) === 0
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <p>
          {record.status === 0
            ? 'Đăng ký'
            : record.status === 1
              ? 'Phê duyệt'
              : record.status === 2
                ? 'Không phê duyệt'
                : record.status === 3
                  ? 'Đã tham gia'
                  : 'Không tham gia'}
        </p>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          {(
            <>
              <Popconfirm
                okButtonProps={{ loading: updateMutation.isLoading }}
                onConfirm={() => {
                  const body = {
                    user_id: record.user_id,
                    status: 1
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
              <Popconfirm
                okButtonProps={{ loading: updateMutation.isLoading }}
                onConfirm={() => {
                  const body = {
                    user_id: record.user_id,
                    status: 3
                  };
                  updateMutation.mutate(body);
                }}
                title={'Đã tham gia'}
              >
                <CheckCircleOutlined className='cursor-pointer'></CheckCircleOutlined>
              </Popconfirm>
              <Popconfirm
                okButtonProps={{ loading: updateMutation.isLoading }}
                onConfirm={() => {
                  const body = {
                    user_id: record.user_id,
                    status: 4
                  };
                  updateMutation.mutate(body);
                }}
                title={'Không tham gia'}
              >
                <ExclamationCircleOutlined className='cursor-pointer'></ExclamationCircleOutlined>
              </Popconfirm>
            </>
          )}
        </Space>
      )
    }
  ];

  return (
    <>
      {
        // dataApplyActivity &&
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>
                Quản lý đơn xin vào hoạt động
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
          <Table dataSource={dataApplyActivity} columns={columns} />
        </React.Fragment>
      }
    </>
  );
};
ApplyActivityManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default ApplyActivityManagement;
