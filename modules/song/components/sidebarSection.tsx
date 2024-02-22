import { Checkbox } from 'antd';
import { ReactNode } from 'react';

export interface Data {
  name: string;
  value: string | number;
}

interface Props {
  title: ReactNode;
  data: Data[];
}

function SidebarSection({ title, data }: Props) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="grid gap-1 py-2">
        {data.map(({ name, value }) => (
          <div key={value} className="flex gap-2">
            <Checkbox />
            <p className="grow truncate">
              <span className="truncate">{name}</span>
            </p>
            <p className="flex-none text-right">999</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarSection;
