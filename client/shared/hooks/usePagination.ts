import { AxiosResponse } from 'axios';
import { IRequestParam, IBaseResponse } from '../typeDefs/baseReponse.type';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import React, { useDebugValue } from 'react';

type Props<T> = {
  apiFn: (params?: IRequestParam) => Promise<AxiosResponse<T>>;
  // apiFn: Function
  defaultParam?: { [key: string]: any };
  extraParamFilterKey: string[];
};

export default function usePagination<T>({
  apiFn,
  extraParamFilterKey,
  defaultParam
}: Props<T>) {
  const router = useRouter();
  const pageIndex = parseInt(router.query.pageIndex as string) || 1;
  const pageSize = parseInt(router.query.pageSize as string) || 10;

  const queryParams = { ...defaultParam, ...router.query };
  function onChangeParams(
    param:
      | ((typeof extraParamFilterKey)[number] & 'pageIndex')
      | 'pageSize'
      | 'limit',
    value: any
  ) {
    router.push({
      pathname: router.pathname,
      query: { ...queryParams, [param]: value }
    });
  }
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['usePagination', router.query],
    queryFn: () => apiFn(queryParams),
    onSuccess(data) {
      // console.log(data)
    }
    // select(data) {
    //     return data.data.data
    // },
  });
  useDebugValue(data);
  return {
    data,
    isFetching,
    refetch,
    pageIndex,
    pageSize,
    params: router.query,
    onChangeParams,
    count: 20
  };
}
