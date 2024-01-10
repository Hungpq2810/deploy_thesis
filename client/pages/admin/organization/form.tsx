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
import { organizationService } from '@/services/organization.service';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormOrganization = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === 'number';
  const updateMutation = useMutation({
    mutationKey: 'update',
    mutationFn: (body: {
      name: string;
      location: string;
      description: string;
    }) => organizationService.updateOrganization(editId as number, body),
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
    }
  }
  const { data } = useQuery(
    ['user'],
    () => organizationService.getOrganizationById(editId as number),
    {
      enabled: isEditIdValidNumber
    }
  );
  const options: SelectProps['options'] = [
    {
      label: 'Hoạt động',
      value: 0
    },
    {
      label: 'Không hoạt động',
      value: 1
    }
  ];
  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue({
        // @ts-ignore
        ...data.data.data.organization
      });
    }
  }, [data]);
  return (
    <Modal
      title={editId ? `Chỉnh sửa ban tổ chức` : 'Tạo ban tổ chức mới'}
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
          label='Tên tổ chức'
          name='name'
          rules={[{ required: true, message: 'Chưa điền tên tổ chức' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Địa chỉ'
          name='location'
          rules={[{ required: true, message: 'Chưa điền địa điểm' }]}
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

        <Form.Item
          label='Trạng thái'
          name='status'
          rules={[{ required: true, message: 'Chưa điền trạng thái' }]}
        >
          <Select
            placeholder='select one status'
            defaultValue={['']}
            optionLabelProp='label'
            options={options}
          />
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

export default FormOrganization;
