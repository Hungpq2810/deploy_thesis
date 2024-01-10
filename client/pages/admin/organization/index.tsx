import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, message, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import { userService } from '@/services/user.service';
import React, { useState } from 'react';
import { organizationService } from '@/services/organization.service';
import { IOrganization } from '@/typeDefs/schema/organization.type';
import FormOrganization from './form';

type Props = {};

const OrganizationManagement = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState<number>();
  const { data: dataOrganization, refetch } = useQuery(
    ['listOrganizationAdmin'],
    () => organizationService.listOrganizationAdmin()
  );
  console.log(dataOrganization);
  
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
  const columns: ColumnType<IOrganization>[] = [
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      render: (_, record) => (
        <p style={{ whiteSpace: 'pre-line' }}>{record.description}</p>
      )
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'location',
      key: 'location'
    },

    {
      title: 'Người sáng lập',
      dataIndex: 'creator',
      render: (_, record) => (
        <div className='w-1/3 flex justify-between items-center'>
          {/* <img
            src={record.creator.avatar}
            width={30}
            height={30}
            className='rounded-full'
          /> */}
          <p>{record.creator.name}</p>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <p>{record.status === 0 ? 'Hoạt động' : 'Không hoạt động'}</p>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <div
            className='cursor-pointer'
            onClick={() => {
              setOpen(true);
              setRowId(record.id);
            }}
          >
            <EditOutlined />
          </div>
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
      {dataOrganization && dataOrganization.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý ban tổ chức</h1>
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
            dataSource={dataOrganization.data.data.organizations}
            columns={columns}
          />
          <FormOrganization
            refetch={refetch}
            editId={rowId}
            open={open}
            setOpen={setOpen}
          />
        </React.Fragment>
      )}
    </>
  );
};
OrganizationManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default OrganizationManagement;
