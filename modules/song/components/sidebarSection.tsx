import { Checkbox } from 'antd';
import { ReactNode } from 'react';
import { SPLIT_CHARACTER } from '../constants';

export interface Data {
  name: string;
  value: number;
  songCount: number;
}

interface Props {
  title: ReactNode;
  data: Data[];
  categoryValue?: string;
  onChange: (value: any) => void;
}

function SidebarSection({ title, data, categoryValue, onChange }: Props) {
  let valueArr = categoryValue?.split(SPLIT_CHARACTER) ?? [];

  const onClick = (id: Data['value'], checked: boolean) => {
    if (checked) {
      valueArr.push(id.toString());
    } else {
      valueArr = valueArr.filter((item) => Number(item) !== Number(id));
    }
    const value = valueArr.join(SPLIT_CHARACTER);
  };

  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="grid gap-1 py-2">
        {data.map((item) => {
          const { name, value, songCount } = item;
          const index = valueArr.find((item) => Number(item) === Number(value));
          const checked = index !== undefined;
          return (
            <div
              key={value}
              className="flex cursor-pointer gap-2"
              onClick={() => onClick(value, !checked)}
            >
              <Checkbox checked={checked} />
              <p className="grow truncate">
                <span className="truncate">{name}</span>
              </p>
              <p className="flex-none text-right">{songCount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SidebarSection;
