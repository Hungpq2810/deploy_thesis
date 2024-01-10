import { ColumnType } from 'antd/es/table';

export interface IColumn<T> extends ColumnType<T> {
  hidden: boolean;
}
