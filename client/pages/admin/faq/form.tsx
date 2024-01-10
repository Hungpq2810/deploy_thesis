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
import { faqService } from '@/services/faq.service';
import { log } from 'console';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormFaq = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === 'number';
  const newMutation = useMutation({
    mutationKey: 'newFaq',
    mutationFn: (body: { question: string; answer: string }) =>
      faqService.newFaq(body),
    onSuccess(data, _variables, _context) {
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
    mutationFn: (body: { question: string; answer: string }) =>
      faqService.updateFaq(editId as number, body),
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
  function handlenew(value: any) {
    if (editId) {
      updateMutation.mutate(value);
    } else {
      newMutation.mutate(value);
    }
  }
  const { data } = useQuery(
    ['user'],
    () => faqService.getFaqById(editId as number),
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
      title={editId ? `Chỉnh sửa faq` : 'Tạo faq mới'}
      centered
      open={open}
      width={1000}
      footer={false}
    >
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handlenew}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item
          label='Câu hỏi'
          name='question'
          rules={[{ required: true, message: 'Chưa điền câu hỏi' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Câu trả lời'
          name='answer'
          rules={[{ required: true, message: 'Chưa điền câu trả lời' }]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
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

export default FormFaq;
