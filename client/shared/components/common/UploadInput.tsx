import { Button, Image, Spin, message } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { httpsNoToken } from '@/config/https.config';
import { EditOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';

type Props = {
  initSrc?: string;
  onChange?: (fileSrc: string) => void;
  className?: string;
};

export default function InputUpload({ initSrc, onChange, className }: Props) {
  const [filePath, setFilePath] = useState(initSrc);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadService = useMutation({
    mutationFn: (formData: { file: File }) =>
      httpsNoToken.post<string>('/Image/Upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
    onSuccess: (data) => {
      setFilePath(data.data);
      if (onChange) onChange(data.data);
    }
  });
  useEffect(() => {
    setFilePath(initSrc);
    return () => setFilePath(undefined);
  }, [initSrc]);

  const handleUploadImage = async (files: FileList | null) => {
    if (!files || files.length <= 0) return;
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      uploadService.mutate(formData as any);
    } catch (error) {
      message.error('Lưu file không thành công!');
    }
  };

  return (
    <Spin spinning={uploadService.isLoading}>
      <input
        accept='capture=camera,image/*'
        type='file'
        ref={inputRef}
        className='!hidden'
        onChange={(event) => handleUploadImage(event.target.files)}
      />

      <div
        className={classNames(
          'relative m-auto overflow-hidden text-start border border-solid border-slate-200 cursor-pointer',
          {
            'h-[135px] w-[500px]': !className,
            [`${className}`]: className
          }
        )}
      >
        <Image
          src={filePath || '/images/default.png'}
          width={1980}
          height={200}
          alt='Pre_image'
          className='w-full object-cover'
        />
        <Button
          className='absolute z-10 top-2 right-4'
          onClick={() => inputRef.current?.click()}
        >
          <EditOutlined />
        </Button>
      </div>
    </Spin>
  );
}
