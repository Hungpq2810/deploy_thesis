import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import Appbar from './components/Appbar';
import SiderMenu from './components/SiderMenu';
import FooterContent from './components/FooterContent';
import { getCookie } from 'cookies-next';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from '@/store/appSlice';
import { APP_SAVE_KEYS } from '@/constant/AppConstant';

const { Header, Content } = Layout;

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  useEffect(() => {
    const key = getCookie(APP_SAVE_KEYS.KEYS);
    const role = getCookie(APP_SAVE_KEYS.ROLE);
    if (typeof key === 'string' && role) {
      const decodeData: any = jwt_decode(key);
      dispatch(
        login({
          role_id: decodeData.role_id,
            username: decodeData.username,
            id: decodeData.id,
            avatar: decodeData.avatar,
            name: decodeData.name,
            email: decodeData.email
        })
      );
    }
  }, []);
  
  console.log('abcabca')

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu />
      <Layout className='site-layout p-2'>
        <Header style={{ background: colorBgContainer }}>
          <Appbar />
        </Header>
        <br />
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer
            }}
          >
            {children}
          </div>
        </Content>
        <FooterContent />
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
