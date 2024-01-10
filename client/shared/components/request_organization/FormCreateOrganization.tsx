import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';
import BlankLayout from '@/layouts/BlankLayout';
import { organizationService } from '@/services/organization.service';
import { useDispatch } from 'react-redux';
import { setInforOrganization } from '@/store/appSlice';
type Props = {
  next: any;
};
const FormCreateOrganization = ({ next }: Props) => {
  const dispatch = useDispatch();
  const newOrganizationMutation = useMutation({
    mutationKey: 'newOrganization',
    mutationFn: (body: {
      name: string;
      location: string;
      description: string;
    }) => organizationService.newOrganization(body),
    onSuccess(data, _variables, _context) {
      if (data.data.data) {
        dispatch(setInforOrganization(data.data.data));
        message.success('Tạo thành công');
      }
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công');
    }
  });
  //Handle submit form Login
  function handleCreate(value: {
    name: string;
    location: string;
    description: string;
  }) {
    newOrganizationMutation.mutate(value);
    next();
  }
  return (
    <React.Fragment>
      <Card
        title='Form điền thông tin tổ chức'
        style={{ minWidth: 700 }}
        extra={
          <img
            style={{ maxWidth: 100, maxHeight: 100 }}
            alt='logo'
            src='/logo.svg'
          />
        }
      >
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={handleCreate}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label='Tên tổ chức'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên tổ chức' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Địa chỉ'
            name='location'
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Mô tả'
            name='description'
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={newOrganizationMutation.isLoading}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
};
FormCreateOrganization.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);
export default FormCreateOrganization;
