import { LOCALE } from '@/enums';
import { FormItemProps } from 'antd';
import AppFormItem from './formItem';
import FormMultiLangCol from './formMultiLangCol';
import FormMultiLangRow from './formMultiLangRow';

type Props = {
  children: any;
  name_vi: string;
  name_en: string;
  title?: boolean;
} & FormItemProps;

function FormMultiLangItem({
  children,
  title,
  name_vi,
  name_en,
  ...props
}: Props) {
  return (
    <FormMultiLangRow>
      <FormMultiLangCol title={title} locale={LOCALE.VI}>
        <AppFormItem {...props} name={name_vi}>
          {children}
        </AppFormItem>
      </FormMultiLangCol>

      <FormMultiLangCol title={title} locale={LOCALE.EN}>
        <AppFormItem {...props} name={name_en}>
          {children}
        </AppFormItem>
      </FormMultiLangCol>
    </FormMultiLangRow>
  );
}

export default FormMultiLangItem;
