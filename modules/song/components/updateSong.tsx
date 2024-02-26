/* eslint-disable react-hooks/exhaustive-deps */
import { PlaySong } from '@/components/appPlaySong';
import {
  AppForm,
  FormDivider,
  FormMultiLangCol,
  FormMultiLangRow,
} from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { uploadFileToBucket } from '@/components/ui/textEditor/api';
import { DATE_FORMAT } from '@/enums';
import { cn } from '@/helpers';
import { useActive, useTranslate } from '@/hooks';
import { FileTypeSelect } from '@/modules/fileType/components';
import { useFileTypeList } from '@/modules/fileType/hooks';
import { GenreSelect } from '@/modules/genre/components';
import { ThemeSelect } from '@/modules/theme/components';
import { Form, Input, InputProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { MP3_CONTENT_TYPE } from '../constants';
import { useSongDetail, useSongDetailExistById, useUpdateSong } from '../hooks';
import { SongData, SongPayload } from '../types';

type Props = {
  dataEdit: SongData | null;
} & Omit<AppModalProps, 'children'>;

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

function UpdateSong({ dataEdit, ...props }: Props) {
  const { dataSongDetail } = useSongDetail(dataEdit?.id as SongData['id']);
  const { dataSongDetailExistById } = useSongDetailExistById(
    dataEdit?.songId as SongData['songId']
  );
  const { dataFileType } = useFileTypeList({});
  const { messages } = useTranslate();
  const [form] = Form.useForm();
  const { active, isActive, inActive } = useActive();
  // const { onStop } = usePlaySong();
  const { updateSong } = useUpdateSong();

  const onFinish = async (values: any) => {
    active();
    const thumbnailFile = values.thumbnail?.fileList?.[0];
    const originalThumbnailFile = thumbnailFile?.originFileObj;
    let imageUrl: string | undefined = thumbnailFile?.url;

    if (originalThumbnailFile) {
      imageUrl = await uploadFileToBucket(originalThumbnailFile);
    }

    const song = values.detailURL
      .filter((item: any) => !!item.fileTypeId)
      .map((item: any) => ({ id: item.id, fileTypeId: item.fileTypeId }));

    if (song.length === 0) {
      const mp3File = dataSongDetailExistById?.detail_url.find(
        (item) => item.file_type === MP3_CONTENT_TYPE
      );
      const defaultFileType = dataFileType[0];
      const data = {
        id: mp3File?.id,
        fileTypeId: defaultFileType?.id,
      };
      song.push(data);
    }

    const payload: SongPayload = {
      name: values.name,
      genreId: values.genreId,
      themeId: values.themeId,
      song,
      thumbnail: imageUrl,
      songId: dataSongDetailExistById.id,
    };
    updateSong({ songId: dataSongDetail.id, payload, onSuccess, onError });
  };

  const onSuccess = () => {
    inActive();
  };

  const onError = () => {
    inActive();
  };

  // useEffect(() => {
  //   return () => onStop();
  // }, []);

  useEffect(() => {
    const {
      name: originalName,
      genres,
      themes,
      upload_date,
      phaseId,
      detail_url,
    } = dataSongDetailExistById;
    const originalGenre = genres?.map((item) => item.name)?.join(', ');
    const originalTheme = themes?.map((item) => item.name)?.join(', ');

    const { name, songGenre, songTheme, songKey } = dataSongDetail;
    const genreId = songGenre?.map((item) => item.genre.id);
    const themeId = songTheme?.map((item) => item.theme.id);

    const detailURL = detail_url?.map((item) => {
      const { id } = item;
      const fileTypeId = songKey?.find((item) => item.detailUrlId === id)
        ?.fileType?.id;
      return {
        ...item,
        fileTypeId,
      };
    });

    const values = {
      name,
      genreId,
      themeId,
      originalName,
      originalGenre,
      originalTheme,
      uploadDate: dayjs(upload_date).format(DATE_FORMAT.DATE_ONLY),
      phaseId,
      detailURL,
      thumbnail: dataSongDetail.thumbnail
        ? {
            fileList: [{ url: dataSongDetail.thumbnail, title: name }],
          }
        : undefined,
    };

    form.setFieldsValue(values);
  }, [dataSongDetailExistById, dataSongDetail]);

  return (
    <AppModal
      {...props}
      title={messages('common.update')}
      footer={null}
      width={1200}
      loading={isActive}
      className="top-10"
    >
      <AppForm
        form={form}
        onFinish={onFinish}
        submitProps={{
          loading: isActive,
        }}
      >
        <FormMultiLangRow gutter={[80, 40]}>
          <FormMultiLangCol title="Dữ liệu gốc">
            <AppFormItem label="Tên bài hát" name="originalName">
              <ViewOnlyInput viewOnly />
            </AppFormItem>

            <AppFormItem label="Thể loại" name="originalGenre">
              <ViewOnlyInput viewOnly />
            </AppFormItem>

            <AppFormItem label="Chủ đề" name="originalTheme">
              <ViewOnlyInput viewOnly />
            </AppFormItem>

            <AppFormItem label="Ngày tải lên" name="uploadDate">
              <ViewOnlyInput viewOnly />
            </AppFormItem>

            <AppFormItem label="Vòng kiểm duyệt" name="phaseId">
              <ViewOnlyInput viewOnly />
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
                        <FileTypeSelect allowClear />
                      </AppFormItem>
                      <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                          const currentValues = getFieldValue('detailURL');
                          const { duration, peakdata, url, fileType, id } =
                            currentValues[index] ?? {};

                          const fileName = fileType?.name ?? 'MP3';
                          return (
                            <AppFormItem
                              {...restField}
                              name={[name, 'id']}
                              label={fileName}
                            >
                              <PlaySong
                                duration={duration}
                                peakData={peakdata}
                                url={url}
                                id={id}
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

export default UpdateSong;
