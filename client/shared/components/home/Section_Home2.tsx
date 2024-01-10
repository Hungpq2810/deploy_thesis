import { Carousel } from 'antd';
import React from 'react';

const Section_Home2 = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <React.Fragment>
      <div className='w-full grid grid-cols-1 justify-center items-center gap-5'>
        <h1 className='flex flex-col justify-center items-center gap-5 mb-5 text-4xl leading-8 text-bold text-[#0F147F]'>
          Sinh viên tình nguyện
          <span>Đại học Bách Khoa Hà Nội</span>
        </h1>
        <Carousel afterChange={onChange}>
          <div className='max-w-[1980px] max-h-[700px] relative overflow-hidden'>
            <img
              className='w-full h-full object-cover object-center rounded-lg'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t1.6435-9/70778019_1689615927837168_1696734011470118912_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9a8829&_nc_eui2=AeFI3xegKSXZe1Kum4gOosa4OwEBNKhdM9k7AQE0qF0z2Rsbj8Tf3LMnA1Jkaqor6cBwsn7KwujifQeR5xKfE7xz&_nc_ohc=knnSDE59VKcAX8Sr6_Y&_nc_ht=scontent.fhan18-1.fna&oh=00_AfDXGCJEbxOxnezVQR_UAspIkt-dhhZy8pLJojxS3chk2Q&oe=65B6F2F6'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/382960363_698788452284615_2506049564570849784_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEjFra4haRnIp-p3WpJEpbdI9CQn8XGir0j0JCfxcaKvRjbDwPX_XMTKDXWH3xF9FgJv5bwhCH49xJSgRl1bswY&_nc_ohc=qu7gNrpmUe8AX8CYX1z&_nc_ht=scontent.fhan18-1.fna&oh=00_AfCpmOI6Wy4FhFG5C_mv82RLGBFCx_aPAk7GQ-ft3zwKbg&oe=65942766'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/369599880_823716053089965_7860870651474304212_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFE56mcSuksgctqT62B7ZRGXl8y1TYl0bteXzLVNiXRuwuAxaKMCvUiYZ3e_-UrlRAQgi4D2qEeR0YJxNzD_ojV&_nc_ohc=4tEaaDJVCKgAX9Ehe_y&_nc_ht=scontent.fhan18-1.fna&oh=00_AfCw9gTrWsmhBNrlClJLyRVrIA6up0nzXRf3s7SqeRqSQg&oe=65955258'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default Section_Home2;
