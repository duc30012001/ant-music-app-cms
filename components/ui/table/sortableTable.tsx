import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import AppTable, { AppTableProps } from './normalTable';

// eslint-disable-next-line no-unused-vars
export type OnDragEnd<T> = (newValue: T) => void;

export interface SortableTableProps<RecordType>
  extends AppTableProps<RecordType> {
  onDragEnd?: OnDragEnd<RecordType[]>;
  dataSource: RecordType[];
  columns: ColumnsType<RecordType>;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const SortableTable: React.FC<SortableTableProps<any>> = ({
  dataSource = [],
  onDragEnd,
  columns = [],
  ...props
}) => {
  const [tableData, setTableData] = useState(dataSource);

  const sortableColumns: ColumnsType<any> = [
    {
      key: 'sort',
      width: 50,
      align: 'center',
    },
    ...columns,
  ];

  const onFinish = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTableData((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        const newTableData = arrayMove(previous, activeIndex, overIndex);
        onDragEnd?.(newTableData);
        return newTableData;
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(dataSource)) {
      setTableData(dataSource);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataSource)]);

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onFinish}>
      <SortableContext
        // rowKey array
        items={tableData.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <AppTable
          {...props}
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey="id"
          columns={sortableColumns}
          dataSource={tableData}
        />
      </SortableContext>
    </DndContext>
  );
};

export default SortableTable;
