import { cn } from '@/helpers';
import { Pagination, PaginationProps } from 'antd';

type AppPaginationProps = {} & PaginationProps;

function AppPagination({ className, ...props }: AppPaginationProps) {
  return (
    <Pagination
      showSizeChanger={false}
      className={cn('!py-3 px-5 text-center', className)}
      {...props}
    />
  );
}

export default AppPagination;
