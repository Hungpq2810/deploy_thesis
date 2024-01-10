import React from 'react';
import ImageSection_AboutUs1 from '../images/ImageSection_AboutUs1';
const Section_AboutUs1 = () => {
  return (
    <React.Fragment>
      <div className='w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-24'>
          <div className='flex flex-col justify-start items-start'>
            <h1 className='flex flex-col gap-10 mb-5 text-6xl leading-8 text-bold text-[#0F147F]'>
              What's mean<span>HUST Volunteer ?</span>
            </h1>
            <p className='text-xl text-primary'>Một nền tảng giúp:</p>
            <p className='text-lg mb-8'>
              Kết nối, điều phối và phối hợp giữa các bên liên quan trong các
              hoạt động tình nguyện, như các cấp bộ Đoàn, Hội, các tổ chức phi
              chính phủ, các doanh nghiệp và cá nhân có sức ảnh hưởng. <br></br>
              Nâng cao hiệu quả và minh bạch trong việc quản lý, theo dõi và
              đánh giá các hoạt động tình nguyện, như số lượng người tham gia,
              số giờ tình nguyện, số tiền quyên góp, số dự án thực hiện, v.v..{' '}
              <br></br>
              Phát huy các sáng kiến tình nguyện vì cộng đồng của các tổ chức,
              cá nhân, Đoàn viên, Hội viên, thanh niên, như các chiến dịch gây
              quỹ, lan tỏa thông điệp, hỗ trợ các nhóm đối tượng bị ảnh hưởng
              bởi các vấn đề xã hội, môi trường, sức khỏe, v.v.. <br></br>
              Tạo ra một cộng đồng tình nguyện lớn mạnh, đa dạng và năng động,
              nơi mọi người có thể chia sẻ, học hỏi, trao đổi kinh nghiệm và
              cùng nhau đóng góp cho sứ mệnh bảo vệ quyền con người, quyền trẻ
              em và phát triển bền vững. <br></br>
            </p>
          </div>
          <ImageSection_AboutUs1 className='w-full' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Section_AboutUs1;
