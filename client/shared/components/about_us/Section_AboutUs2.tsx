import React from 'react';
import IconValues from '../icons/about_us/IconValues';
import IconLanguage from '../icons/about_us/IconLanguage';
import IconChart from '../icons/about_us/IconChart';
import IconAnimation from '../icons/about_us/IconAnimation';

const Section_AboutUs2 = () => {
  return (
    <React.Fragment>
      <div className='mt-5 w-full bg-teal-400 rounded-sm'>
        <div className='my-10 flex flex-col justify-center items-center'>
          <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>
            Các giá trị mà HVMS mang lại
          </h1>
        </div>
        <div className='p-5 grid grid-cols-2 md:grid-cols-4 gap-5'>
          <div className='flex flex-col justify-center items-center gap-5'>
            <IconValues className='p-5 bg-white rounded-full' />
            <p>Những giá trị mới lạ</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-5'>
            <IconLanguage className='p-5 bg-white rounded-full' />
            <p>Đa dạng phương thức quản lý</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-5'>
            <IconChart className='p-5 bg-white rounded-full' />
            <p>Những thống kê cụ thể, trực quan</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-5'>
            <IconAnimation className='p-5 bg-white rounded-full' />
            <p>Đưa tình nguyện đến với cộng đồng</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Section_AboutUs2;
