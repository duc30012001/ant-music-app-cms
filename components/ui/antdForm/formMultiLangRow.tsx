import { Row, RowProps } from 'antd';
import { ReactNode } from 'react';

interface Props extends RowProps {
  children: ReactNode;
}

function FormMultiLangRow({ children, gutter = [30, 20], ...props }: Props) {
  return (
    <Row {...props} gutter={gutter}>
      {children}
    </Row>
  );
}

export default FormMultiLangRow;
