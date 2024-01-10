import { APP_URL } from '@/constant/AppConstant';
import { useAppSelector } from '@/hooks/useRedux';
import useTrans from '@/hooks/useTrans';
import { logout } from '@/store/appSlice';
import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons/lib/icons';
import { Col, Dropdown, Input, MenuProps, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Appbar = () => {
  const { user } = useAppSelector((state) => state.appSlice);
  const router = useRouter();
  const { trans, lang, changeLanguage } = useTrans();
  const dispatch = useDispatch();
  const [isOpenModalLogout, setOpenModalLogout] = useState(false);
  const items: MenuProps['items'] = [
    {
      key: '2',
      label: <div>{trans.common.setting}</div>,
      icon: <SettingOutlined />,
      onClick: () => router.push(APP_URL.SETTINGS)
    },
    {
      key: '1',
      label: <div>{trans.common.logout}</div>,
      icon: <LogoutOutlined />,
      onClick: () => setOpenModalLogout(true)
    }
  ];
  const handleSearch = (value: string | number) => {
    console.log('search value:', value);
  };
  function handleLogout() {
    deleteCookie('keys');
    deleteCookie('sessionKey');
    deleteCookie('role');
    deleteCookie('timeExpired');
    dispatch(logout());
    setTimeout(() => {
      router.push('/login');
    }, 500);
  }

  return (
    <React.Fragment>
      <Row gutter={12} justify='space-between' align='middle'>
        <Col flex='1' span='10'>
          <Input.Search
            style={{ display: 'flex', margin: '0 auto' }}
            placeholder={`${trans.common.search}...`}
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            onSearch={(value) => handleSearch(value)}
          />
        </Col>
        <Col flex='1' span='3'>
          <Row>
            {/* <Col span={12}>
              <Dropdown>
                <div style={{ fontSize: '24px' }}>
                  <BellOutlined />
                </div>
              </Dropdown>
            </Col> */}
            <Col style={{ cursor: 'pointer' }} span={24}>
              <Dropdown menu={{ items }}>
                <div className='h-full text-2xl flex items-center justify-center'>
                  <img
                    className='block mx-auto max-w-[32px] max-h-[32px] rounded-[50px]'
                    alt='userIcon'
                    src='/userIcon.png'
                  />
                  <p className='text-sm'>Xin chào: {user?.username}</p>
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        open={isOpenModalLogout}
        title='Bạn sắp đăng xuất?'
        onOk={handleLogout}
        onCancel={() => setOpenModalLogout(false)}
        okText='Đồng ý'
        cancelText='Hủy'
      ></Modal>
    </React.Fragment>
  );
};

export default Appbar;
