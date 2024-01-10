import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, message, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ColumnType } from 'antd/lib/table';
import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useMutation, useQuery } from 'react-query';
import { userService } from '@/services/user.service';
import React from 'react';
import { IUser, IUserList } from '@/typeDefs/schema/user.type';
import FormSkill from './forrm';
import { skillService } from '@/services/skill.service';
import { ISkill } from '@/typeDefs/schema/skill.type';

type Props = {};

const SkillManagement = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [action, setAtion] = useState<string>('');
  const [rowId, setRowId] = useState<number>();
  const { data: dataSkill, refetch } = useQuery(['listSkill'], () =>
    skillService.getAllSkill()
  );
  const deleteMutation = useMutation({
    mutationKey: ['deleteUserMutation'],
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => {
      message.success('Xoá thành công');
      refetch();
    },
    onError() {
      message.error('Xoá không thành công');
    }
  });
  const columns: ColumnType<ISkill>[] = [
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
      title: 'Tên skill',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mo ta skill',
      dataIndex: 'description',
      key: 'description'
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
      {dataSkill && dataSkill.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý kỹ năng</h1>
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
          <Table dataSource={dataSkill.data.data.skills} columns={columns} />
          {action === 'create' && !rowId ? (
            <FormSkill refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormSkill
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
SkillManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default SkillManagement;
