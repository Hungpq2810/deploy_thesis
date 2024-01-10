import { organizationService } from '@/services/organization.service';
import { Card } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

const OrganizationPage = () => {
  const router = useRouter();
  const { data: dataOrganization, refetch } = useQuery(['listActivity'], () =>
    organizationService.getAllOrganization()
  );
  return (
    <React.Fragment>
      <Head>
        <title>Danh sách tổ chức</title>
        <meta name='description' content='Danh sách tổ chức' />
        <meta name='keywords' content='Activity Management' />
      </Head>
      <h1 className='flex flex-col justify-center items-center gap-10 mb-24 text-6xl leading-8 text-bold text-[#0F147F]'>
        Danh sách tổ chức
      </h1>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5'>
        {dataOrganization &&
          dataOrganization.data &&
          dataOrganization.data.data.organizations.map((item) => (
            <Card key={item.id} style={{ width: 400 }}>
              <h4 className=''>Tên: {item.name}</h4>
              <p><strong>Người đứng đầu:</strong> {item.creator.name}</p>  
              
              <span style={{ whiteSpace: 'pre-line' }}> <strong> Mô tả: </strong>
              <br />
              {item.description}
              </span>
            </Card>
          ))}
      </div>
    </React.Fragment>
  );
};

export default OrganizationPage;
