import { faqService } from '@/services/faq.service';
import React from 'react';
import { useQuery } from 'react-query';
import { Collapse } from 'antd';
import dayjs from 'dayjs';
const { Panel } = Collapse;

const FAQPage = () => {
  const { data: dataFaq } = useQuery(['listFaq'], () => faqService.getAllFaq());
  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>
          FAQ
        </h1>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
        {dataFaq &&
          dataFaq.data.data &&
          dataFaq.data.data.faqs.map((faq) => (
            <Collapse key={faq.id} collapsible='icon' defaultActiveKey={['1']}>
              <Panel header={faq.question} key='1'>
                <span style={{ whiteSpace: 'pre-line' }}>{faq.answer}</span>
                <p>
                  Cập nhật lúc: {dayjs(faq.updated_at).format('DD/MM/YYYY')}
                </p>
              </Panel>
            </Collapse>
          ))}
      </div>
    </React.Fragment>
  );
};

export default FAQPage;
