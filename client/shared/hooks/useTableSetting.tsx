import { Card, Modal, Tag, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React from 'react';

type Props<T> = {
  columns: ColumnType<T>[];
  setColumns: Function;
  isOpen: boolean;
  setOpen: Function;
};

export default function useTableSetting<T>({
  columns,
  isOpen,
  setOpen,
  setColumns
}: Props<T>) {
  function getModal() {
    return (
      <Modal
        open={isOpen}
        onCancel={() => setOpen(false)}
        title='Cấu hình bảng'
        okText='Lưu cấu hình'
        cancelText='Hủy'
      >
        <Card>
          <div>
            <Typography className='font-bold mb-4 '>
              Thứ tự các cột:{' '}
            </Typography>
            {columns.map((item) => (
              <Tag>{item.title as string}</Tag>
            ))}
          </div>
        </Card>
      </Modal>
    );
  }
  return { ModalSetting: getModal };
}
