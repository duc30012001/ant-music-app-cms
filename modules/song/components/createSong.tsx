import { PlaySong, usePlaySong } from '@/components/appPlaySong';
import {
  AppForm,
  FormDivider,
  FormMultiLangCol,
  FormMultiLangRow,
} from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { DATE_FORMAT } from '@/enums';
import { cn, handleGetErrorMessage, showNotification } from '@/helpers';
import { useActive, useTranslate } from '@/hooks';
import { FileTypeSelect } from '@/modules/fileType/components';
import { GenreSelect } from '@/modules/genre/components';
import { ThemeSelect } from '@/modules/theme/components';
import { Button, Divider, Form, Input, InputProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { songApi } from '../api';
import { useCreateSong } from '../hooks';
import { SongDetailExists, SongPayload } from '../types';

type Props = {} & Omit<AppModalProps, 'children'>;

interface ViewOnlyInputProps extends InputProps {
  viewOnly?: boolean;
}

const ViewOnlyInput = ({ viewOnly, ...props }: ViewOnlyInputProps) => (
  <Input
    {...props}
    className={cn({ '!bg-white !text-gray-900': viewOnly })}
    disabled
  />
);

function CreateSong({ ...props }: Props) {
  const songSlug = useRef<string | undefined>();
  const { messages } = useTranslate();
  const [form] = Form.useForm();
  const { active, isActive, inActive } = useActive();
  const { onStop } = usePlaySong();

  const [songData, setSongData] = useState<SongDetailExists | undefined>();
  const { createSong } = useCreateSong();

  const onGetInfoSong = async () => {
    const value = songSlug.current;
    if (!value) {
      showNotification('error', 'Vui lòng nhập link bài hát');
      return;
    }
    active();
    songApi
      .getExistDetail(value)
      .then((response) => {
        const data = response.data.docs.result;
        const { name, genres, themes, upload_date, phaseId, detail_url } = data;
        const originalGenre = genres.map((item) => item.name).join(', ');
        const originalTheme = themes.map((item) => item.name).join(', ');

        const values = {
          originalName: name,
          name,
          originalGenre,
          originalTheme,
          uploadDate: dayjs(upload_date).format(DATE_FORMAT.DATE_ONLY),
          phaseId,
          detailURL: detail_url,
        };

        form.setFieldsValue(values);
        setSongData(data);
      })
      .catch((error) => {
        const message = handleGetErrorMessage(error);
        showNotification('error', message);
      })
      .finally(() => {
        inActive();
      });
  };

  const onFinish = (values: any) => {
    active();
    const song = values.detailURL
      .filter((item: any) => !!item.fileTypeId)
      .map((item: any) => ({ id: item.id, fileTypeId: item.fileTypeId }));
    const payload: SongPayload = {
      name: values.name,
      songId: songData?.id as number,
      genreId: values.genreId,
      themeId: values.themeId,
      song,
    };
    createSong({ payload, onSuccess, onError });
  };

  const onSuccess = () => {
    form.resetFields();
    inActive();
  };

  const onError = () => {
    inActive();
  };

  useEffect(() => {
    return () => onStop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppModal
      {...props}
      title={messages('common.create')}
      footer={null}
      width={1200}
      loading={isActive}
      className="top-10"
    >
      <div>
        <div className="flex items-center gap-2 font-medium">
          <label htmlFor="songSlug" className="flex-none">
            Link bài hát
          </label>
          <Input
            name="songSlug"
            onChange={(e) => (songSlug.current = e.target.value)}
          />
          <Button type="primary" onClick={onGetInfoSong} loading={isActive}>
            Lấy thông tin
          </Button>
        </div>
      </div>

      <Divider />

      <AppForm
        disabled={!songData}
        form={form}
        onFinish={onFinish}
        submitProps={{
          loading: isActive,
        }}
      >
        <FormMultiLangRow gutter={[80, 40]}>
          <FormMultiLangCol title="Dữ liệu gốc">
            <AppFormItem label="Tên bài hát" name="originalName">
              <ViewOnlyInput viewOnly={!!songData} />
            </AppFormItem>

            <AppFormItem label="Thể loại" name="originalGenre">
              <ViewOnlyInput viewOnly={!!songData} />
            </AppFormItem>

            <AppFormItem label="Chủ đề" name="originalTheme">
              <ViewOnlyInput viewOnly={!!songData} />
            </AppFormItem>

            <AppFormItem label="Ngày tải lên" name="uploadDate">
              <ViewOnlyInput viewOnly={!!songData} />
            </AppFormItem>

            <AppFormItem label="Vòng kiểm duyệt" name="phaseId">
              <ViewOnlyInput viewOnly={!!songData} />
            </AppFormItem>
          </FormMultiLangCol>

          <FormMultiLangCol title="Dữ liệu mới">
            <AppFormItem
              label="Tên bài hát"
              name="name"
              rules={[
                {
                  required: true,
                  message: messages('validation.input'),
                },
              ]}
            >
              <Input placeholder="Nhập tên bài hát" />
            </AppFormItem>

            <AppFormItem
              label="Thể loại"
              name="genreId"
              rules={[
                {
                  required: true,
                  message: messages('validation.select'),
                },
              ]}
            >
              <GenreSelect mode="multiple" />
            </AppFormItem>

            <AppFormItem
              label="Chủ đề"
              name="themeId"
              rules={[
                {
                  required: true,
                  message: messages('validation.select'),
                },
              ]}
            >
              <ThemeSelect mode="multiple" />
            </AppFormItem>

            <Form.List name="detailURL">
              {(fields, { add, remove }) => (
                <>
                  <FormDivider />
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key}>
                      <AppFormItem
                        {...restField}
                        name={[name, 'fileTypeId']}
                        label="Loại file"
                      >
                        <FileTypeSelect />
                      </AppFormItem>
                      <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                          const currentValues = getFieldValue('detailURL');
                          const { duration, peakdata, url } =
                            currentValues[index] ?? {};
                          return (
                            <AppFormItem
                              {...restField}
                              name={[name, 'id']}
                              label="File"
                            >
                              <PlaySong
                                duration={duration}
                                peakData={peakdata}
                                url={url}
                              />
                            </AppFormItem>
                          );
                        }}
                      </Form.Item>
                      <FormDivider />
                    </div>
                  ))}
                </>
              )}
            </Form.List>

            <AppFormItem label={messages('common.thumbnail')} name="thumbnail">
              <ImageUpload />
            </AppFormItem>
          </FormMultiLangCol>
        </FormMultiLangRow>
      </AppForm>
    </AppModal>
  );
}

export default CreateSong;
