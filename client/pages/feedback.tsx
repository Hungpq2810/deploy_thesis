import { faqService } from '@/services/faq.service';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Button, Card, Collapse, Input, Form, Rate, message, Space } from 'antd';
import dayjs from 'dayjs';
import { feedbackService } from '../shared/services/feedback.service';
import { useAppSelector } from '../shared/hooks/useRedux';
const { Panel } = Collapse;

const FeedbackPage = () => {
  const { data: dataFeedback } = useQuery(['listFeedback'], () =>
    feedbackService.getAllFeedbackNoAuth()
  );
  const [rate, setRate] = useState(0);
  const { user } = useAppSelector((state) => state.appSlice);
  const newFeedbackMutation = useMutation({
    mutationKey: 'newFeedback',
    mutationFn: (body: {
      activity_id: number;
      title: string;
      content: string;
      rate: number;
    }) => feedbackService.newActivity(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success('Tạo thành công');
      window.location.reload();
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công');
    }
  });
  function handleNewFeedback(value: any) {
    const body = {
      activity_id: 0,
      title: value.title,
      content: value.content,
      rate: rate
    };
    newFeedbackMutation.mutate(body);
  }
  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>
          Feedback
        </h1>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
        {dataFeedback &&
          dataFeedback.data.data &&
          dataFeedback.data.data.feedbacks.map((feedback) => (
            <Collapse
              key={feedback.id}
              collapsible='icon'
              defaultActiveKey={['1']}
            >
              <Panel header={feedback.title} key='1'>
              <Space>
                      <Rate disabled value={feedback.rate} />
                      {/* {rate ? <span>{[rate - 1]}</span> : ''} */}
              </Space>
              <br></br>
                <span style={{ whiteSpace: 'pre-line' }}>{feedback.content}</span>
                <p>
                  Cập nhật lúc:{' '}
                  {dayjs(feedback.updated_at).format('DD/MM/YYYY')}
                </p>
              </Panel>
            </Collapse>
          ))}
      </div>

      <Card title='Feedback' className='mt-10' style={{ width: '100%' }}>
            <Form
              name='newFeedback'
              initialValues={{ remember: true }}
              onFinish={handleNewFeedback}
              autoComplete='off'
              layout='vertical'
            >
              <Form.Item
                label='Tiêu đề'
                name='title'
                rules={[{ required: true, message: 'Chưa điền tiêu đề' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Nội dung'
                name='content'
                rules={[{ required: true, message: 'Chưa điền nội dung' }]}
              >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 20 }} />
              </Form.Item>

              <Form.Item label='Đánh giá' name='rate'>
                <Rate onChange={setRate} value={rate} />
                {rate ? <span> {[rate]}</span> : ''}
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button htmlType='submit'>Gửi đánh giá</Button>
              </Form.Item>
            </Form>
          </Card>
    </React.Fragment>
  );
};

export default FeedbackPage;
