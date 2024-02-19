import { Row } from 'antd';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function FormMultiLangRow({ children }: Props) {
  return <Row gutter={[30, 20]}>{children}</Row>;
}

export default FormMultiLangRow;
