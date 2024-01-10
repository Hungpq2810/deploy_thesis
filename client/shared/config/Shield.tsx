// ** Next,React Imports
import { useRouter } from 'next/router';
import { NextShield } from 'next-shield';
import { ReactNode } from 'react';

// ** Types Imports
import { useAppSelector } from '@/hooks/useRedux';
import { Spin } from 'antd';

interface Props {
  children: ReactNode;
}
export function Shield({ children }: Props) {
  // const { isAuth, privateRoute } = useAppSelector(state => state.appSlice)
  const router = useRouter();
  const shieldConfig = {
    router,
    isAuth: false,
    isLoading: false,
    LoadingComponent: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spin />
      </div>
    ),
    privateRoutes: ['/admin/*', '/organizer/*'],
    publicRoutes: ['/login', '/'],
    loginRoute: '/login',
    accessRoute: '/'
  };

  return (
    <>
      <NextShield {...shieldConfig}>{children}</NextShield>
    </>
  );
}
