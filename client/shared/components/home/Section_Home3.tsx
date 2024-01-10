import { Image } from 'antd';
import React from 'react';

const Section_Home3 = () => {
  return (
    <React.Fragment>
      <div className='mt-5 w-full grid grid-cols-1 justify-center items-center gap-5'>
        <div className='mb-5 flex flex-col justify-center items-center'>
          <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>
            Tầm nhìn của chúng tôi
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-10'>
          <div className='col-span-1 w-full h-full flex flex-col justify-center items-center gap-3'>
            <p className='text-xl text-center m-0'>
              Tạo ra một môi trường quản lý sinh viên tình nguyện đa dụng, thuận
              tiện cho mọi hoạt động của mỗi đội tình nguyện và của ĐHBK HN
            </p>
            <img
              className='w-full h-full object-cover object-center rounded-lg'
              src='https://www.kindpng.com/picc/m/411-4115439_transparent-volunteer-clipart-hd-png-download.png'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='col-span-2 max-w-[1980px] h-[600px] relative overflow-hidden'>
            <div className='w-full h-full relative'>
              <img
                className='object-contain w-full h-full'
                src='https://www.sterlingbackcheck.ca/wp-content/uploads/2019/06/Blog_Globe.jpg'
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                alt='Image'
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Section_Home3;
