import React from 'react';
import ImageSection_Home1 from '../images/ImageSection_Home1';
import IconServiceUser from '../icons/home/IconServiceUser';
import IconGuarantee from '../icons/home/IconGuarantee';
import IconTeam from '../icons/home/IconTeam';
import { Button } from 'antd';

const Section_Home1 = () => {
  return (
    <React.Fragment>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col justify-start items-start'>
          <h1 className='flex flex-col gap-10 mb-5 text-6xl leading-8 text-bold text-[#0F147F]'>
            HUST Volunteer <span>Management System</span>
          </h1>
          <div className='mb-5 flex flex-col justify-start items-start gap-3'>
            <div className='flex justify-center items-center gap-2'>
              <IconServiceUser width={50} height={30} />
              <p className='text-bold text-xl'>Quản lý tình nguyện viên</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <IconGuarantee width={50} height={30} />
              <p className='text-bold text-xl'>Liên hệ, phản hồi nhanh chóng</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <IconTeam width={50} height={30} />
              <p className='text-bold text-xl'>
                Quản lý các hoạt động tình nguyện
              </p>
            </div>
          </div>
          <div className='flex justify-start items-start gap-3'>
            {/* <Button className='bg-[#2f91e2] text-white p-5 flex items-center justify-center'>GET A FAST QUOTE</Button> */}
            {/* <Button className='bg-[#9866EB] text-white p-5 flex items-center justify-center'>Contact Us</Button> */}
          </div>
        </div>
        <ImageSection_Home1 />
      </div>
    </React.Fragment>
  );
};

export default Section_Home1;
