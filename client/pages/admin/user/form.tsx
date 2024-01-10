import { useMutation, useQuery } from 'react-query';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Col,
  DatePicker,
  Select,
  SelectProps
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { userService } from '@/services/user.service';
import dayjs from 'dayjs';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormUser = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === 'number';
  const registerMutation = useMutation({
    mutationKey: 'register',
    mutationFn: (body: { username: string; password: string }) =>
      userService.newUser(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success('Tạo thành công');
      setOpen(false);
      refetch();
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công');
    }
  });
  const updateMutation = useMutation({
    mutationKey: 'update',
    mutationFn: (body: { username: string; password: string }) =>
      userService.updateUser(editId as number, body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success('Cập nhật thành công');
      setOpen(false);
      refetch();
    },
    onError(error, variables, context) {
      message.error('Cập nhật không thành công');
    }
  });
  function handleregister(value: any) {
    if (editId) {
      updateMutation.mutate(value);
    } else {
      registerMutation.mutate(value);
    }
  }
  const { data } = useQuery(
    ['user'],
    () => userService.getUserById(editId as number),
    {
      enabled: isEditIdValidNumber
    }
  );
  useEffect(() => {
    if (editId && data) {
      const formattedBirthday = dayjs(data.data.data.birthday).format(
        'YYYY-MM-DD'
      );

      form.setFieldsValue({
        ...data.data.data,
        birthday: formattedBirthday
      });
    }
  }, [data]);
  const options: SelectProps['options'] = [
    {
      label: 'Nam',
      value: 0
    },
    {
      label: 'Nữ',
      value: 1
    }
  ];
  return (
    <Modal
      title={editId ? `Chỉnh sửa tài khoản` : 'Tạo tài khoản mới'}
      centered
      open={open}
      width={1000}
      footer={false}
    >
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleregister}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item
          label='Tên tài khoản'
          name='username'
          rules={[{ required: true, message: 'Chưa điền tên tài khoản' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Chưa điền email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Tên'
          name='name'
          rules={[{ required: true, message: 'Chưa điền tên' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Số điện thoại'
          name='phone'
          rules={[{ required: true, message: 'Chưa điền số điện thoại' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label='Giới tính'
          name='gender'
          rules={[{ required: true, message: 'Chưa điền giới tính' }]}
        >
          <Select
            placeholder='select one country'
            defaultValue={['']}
            optionLabelProp='label'
            options={options}
          />
        </Form.Item>

        <Form.Item
          label='Ngày sinh'
          name='birthday'
          rules={[{ required: true, message: 'Chưa điền ngày sinh' }]}
          getValueFromEvent={(onChange) => dayjs(onChange).format('YYYY-MM-DD')}
          getValueProps={(i) => ({ value: dayjs(i) })}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label='Địa chỉ'
          name='address'
          rules={[{ required: true, message: 'Chưa điền địa chỉ' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[{ required: false, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password visibilityToggle={false} />
        </Form.Item>

        <Row justify={'center'} align={'middle'} gutter={16}>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button onClick={() => setOpen(false)} htmlType='button'>
                Huỷ bỏ
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button htmlType='submit'>
                {editId ? 'Chỉnh sửa' : 'Tạo mới'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormUser;
