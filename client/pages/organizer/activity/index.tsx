import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Image,
  message,
  Popconfirm,
  Row,
  Space,
  Table
} from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import React, { useState } from 'react';
import { activityService } from '@/services/activity.service';
import { IActivity } from '@/typeDefs/schema/activity.type';
import FormActivity from './form';
import { useAppSelector } from '@/hooks/useRedux';

type Props = {};

const ActivityManagement = ({}: Props) => {
  const { user } = useAppSelector((state) => state.appSlice);
  const [open, setOpen] = useState(false);
  const [action, setAtion] = useState<string>('');
  const [rowId, setRowId] = useState<number>();
  const { data: dataActivity, refetch } = useQuery(
    ['listActivty'],
    () => activityService.getAllActivity(),
    {
      select(data) {
        const filterActivity = data.data.data.activities.filter(
          (activity) => activity.creator_id === +user!.id
        );
        
        
        return filterActivity;
      }
    }
  );
  const columns: ColumnType<IActivity>[] = [
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
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => (
        <p style={{ whiteSpace: 'pre-line' }}>{record.description}</p>
      )
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Số lượng TNV đã duyệt / tối đa',
      key: 'num_of_volunteers',
      render: (_, record) => (
        <div className='w-full pr-5 max-h-[300px] overflow-y-scroll flex flex-col justify-start items-start gap-3'>
          <p>
            {record.num_of_accepted} / {record.max_of_volunteers}
          </p>
        </div>
      )
    },
    {
      title: 'Hình ảnh',
      key: 'image',
      render: (_, record) => (
        <>
          <Image
            src={record.image}
            width={250}
            height={150}
            className='rounded-lg'
          />
        </>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => (
        <p>{record.status === 0 ? 'Đang mở' : 'Đã đóng'}</p>
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
              setAtion('edit');
              setOpen(true);
              setRowId(record.id);
            }}
          >
            <EditOutlined />
          </div>
        </Space>
      )
    }
  ];
  console.log(dataActivity);

  return (
    <>
      {dataActivity && (
        // dataActivity.data.data
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý hoạt động</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-between items-center gap-3'>
                <Search
                  className='bg-blue-300 rounded-lg'
                  placeholder='Tìm kiếm'
                  onSearch={() => {}}
                  enterButton
                />
                <Button
                  onClick={() => {
                    setAtion('create');
                    setRowId(NaN);
                    setOpen(true);
                  }}
                >
                  Tạo mới
                </Button>
              </div>
            </Col>
          </Row>
          <Table
            dataSource={dataActivity}
            columns={columns}
            scroll={{ x: 'max-content' }}
          />
          {action === 'create' && !rowId ? (
            <FormActivity refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormActivity
              refetch={refetch}
              editId={rowId}
              open={open}
              setOpen={setOpen}
            />
          )}
        </React.Fragment>
      )}
    </>
  );
};
ActivityManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default ActivityManagement;
