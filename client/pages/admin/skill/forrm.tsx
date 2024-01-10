import { useMutation, useQuery } from 'react-query';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Col,
  Select,
  SelectProps
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { skillService } from '@/services/skill.service';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormSkill = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === 'number';
  const registerMutation = useMutation({
    mutationKey: 'register',
    mutationFn: (body: { name: string; description: string }) =>
      skillService.newSkill(body),
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
    mutationFn: (body: { name: string; description: string }) =>
      skillService.updateSkill(editId as number, body),
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
    ['skill'],
    () => skillService.getSkillById(editId as number),
    {
      enabled: isEditIdValidNumber
    }
  );
  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue({
        ...data.data.data
      });
    }
  }, [data]);

  return (
    <Modal
      title={editId ? `Chỉnh sửa kỹ năng` : 'Tạo kỹ năng mới'}
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
          label='Tên kỹ năng'
          name='name'
          rules={[{ required: true, message: 'Chưa điền tên kỹ năng' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Mô tả'
          name='description'
          rules={[{ required: true, message: 'Chưa điền mô tả' }]}
        >
          <Input />
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

export default FormSkill;
