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
import { faqService } from '@/services/faq.service';
import { IFaq } from '@/typeDefs/schema/faq.type';
import FormFaq from './form';

type Props = {};

const FAQManagement = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [action, setAtion] = useState<string>('');
  const [rowId, setRowId] = useState<number>();
  const { data: dataFaq, refetch } = useQuery(['listFaq'], () =>
    faqService.getAllFaq()
  );
  const deleteMutation = useMutation({
    mutationKey: ['deleteMutation'],
    mutationFn: (faqId: number) => faqService.deleteFaq(faqId),
    onSuccess: () => {
      message.success('Xoá thành công');
      refetch();
    },
    onError() {
      message.error('Xoá không thành công');
    }
  });
  const columns: ColumnType<IFaq>[] = [
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
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: 'Trả lời',
      key: 'answer',
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre-line' }}>{record.answer}</div>
      )
    },
    {
      title: 'Ngày tạo',
      key: 'created_at',
      render: (_, record) => <p>{record.created_at}</p>
    },
    {
      title: 'Ngày cập nhật',
      key: 'updated_at',
      render: (_, record) => <p>{record.updated_at}</p>
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
      {dataFaq && dataFaq.data.data && (
        <React.Fragment>
          <Row justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl'>Quản lý FAQ</h1>
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
          <Table dataSource={dataFaq.data.data.faqs} columns={columns} />
          {action === 'create' && !rowId ? (
            <FormFaq refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormFaq
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
FAQManagement.getLayout = (children: React.ReactNode) => (
  <DashboardLayout>{children}</DashboardLayout>
);
export default FAQManagement;
