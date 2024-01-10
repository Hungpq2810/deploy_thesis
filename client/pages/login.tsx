import { authService } from '@/services/auth.service';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import jwt_decode from 'jwt-decode';
import BlankLayout from '@/layouts/BlankLayout';
import { useDispatch } from 'react-redux';
import { login } from '@/store/appSlice';
import { APP_SAVE_KEYS } from '@/constant/AppConstant';
import useTrans from '@/hooks/useTrans';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { log } from 'console';
type Props = {};

const Login = ({}: Props) => {
  const router = useRouter();
  const { trans } = useTrans();
  const dispatch = useDispatch();
  const loginMutation = useMutation({
    mutationKey: 'login',
    mutationFn: (body: { username: string; password: string }) =>
      authService.authenticated(body),
    onSuccess(data, _variables, _context) {
      const res = data.data.data;
      const decodeData: any = jwt_decode(res.token);
      if (decodeData) {
        setCookie(APP_SAVE_KEYS.KEYS, res.token, { maxAge: decodeData.exp });
        setCookie(APP_SAVE_KEYS.ROLE, decodeData.role_id);
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
        message.success('Đăng nhập thành công');
        router.push('/');
      }
    },
    onError(error, variables, context) {
      message.error('Tài khoản hoặc mật khẩu sai');
    }
  });
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
      router.push('/');
    }
  }, []);

  //Handle submit form Login
  function handleLogin(value: { username: string; password: string }) {
    loginMutation.mutate(value);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập ngay</title>
      </Head>
      <Card
        title={trans.page.login.formHeader}
        style={{ minWidth: 700 }}
        extra={
          <img
            style={{ maxWidth: 100, maxHeight: 100 }}
            alt='logo'
            src='/logo.svg'
          />
        }
      >
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label={trans.page.login.username}
            name='username'
            rules={[
              { required: true, message: trans.page.login.requiredUsername }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={trans.page.login.password}
            name='password'
            rules={[
              { required: true, message: trans.page.login.requiredPassword }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className='w-full flex justify-between items-center'>
            <Form.Item
              name='remember'
              valuePropName='checked'
              className='m-0 p-0'
            >
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>
            <p className='m-0 p-0 cursor-pointer hover:text-blue-500'>
              Quên mật khẩu?
            </p>
          </div>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={loginMutation.isLoading}
            >
              {trans.page.login.login}
            </Button>
            <p className='mt-5 p-0 cursor-pointer text-black'>
              Chưa có tài khoản?{' '}
              <span
                className='text-blue-400 hover:text-blue-500'
                onClick={() => router.push('/register')}
              >
                Tạo tài khoản ngay
              </span>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
};
Login.getLayout = (children: React.ReactNode) => (
  <BlankLayout>{children}</BlankLayout>
);
export default Login;
