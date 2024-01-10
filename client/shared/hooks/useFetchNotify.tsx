import { dataDynamicService } from '@/services/data.service';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';

type Props = {};

export default function useFetchNotify() {
  const { data: dataTrans } = useQuery(
    ['dataTrans'],
    () => dataDynamicService.getDataDynamic('transactions'),
    {
      select(data) {
        const dataCurrent = data.data.data.filter((item, index, self) => {
          return (
            index === self.findIndex((obj) => obj.requestID === item.requestID)
          );
        });
        return dataCurrent;
      }
    }
  );
  const { data: dataAccount } = useQuery(
    ['dataAccount'],
    () => dataDynamicService.getDataDynamic('account'),
    {
      select(data) {
        const dataCurrent = data.data.data.filter((item, index, self) => {
          return (
            index === self.findIndex((obj) => obj.requestID === item.requestID)
          );
        });
        return dataCurrent;
      }
    }
  );
  const { data: dataCustomer } = useQuery(
    ['dataCustomer'],
    () => dataDynamicService.getDataDynamic('customer'),
    {
      select(data) {
        const dataCurrent = data.data.data.filter((item, index, self) => {
          return (
            index === self.findIndex((obj) => obj.requestID === item.requestID)
          );
        });
        return dataCurrent;
      }
    }
  );
  const result = _.concat(dataTrans, dataAccount, dataCustomer);
  const dataFailedLength = result.filter(
    (data) => data?.errorcode !== '0' && data?.errorcode !== null
  ).length;
  const dataSuccessedLength = result.length - dataFailedLength;
  const testNotification = result.filter(
    (data) => data?.errorcode !== '0' && data?.errorcode !== null
  );
  return {
    dataFailedLength,
    dataSuccessedLength,
    testNotification
  };
}
