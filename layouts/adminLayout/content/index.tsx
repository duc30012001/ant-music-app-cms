import { Layout } from 'antd';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const { Content } = Layout;

function ContentComponent({ children }: Props) {
  return (
    <Content className="bg-gray-100">
      <div className="h-[calc(100vh-4rem)] overflow-auto">
        <div className="px-2 pb-10 pt-5 md:px-5 xl:px-7">{children}</div>
      </div>
    </Content>
  );
}

export default ContentComponent;
