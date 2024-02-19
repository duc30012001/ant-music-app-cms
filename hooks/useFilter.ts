/* eslint-disable no-unused-vars */
import { OnSearchType } from '@/components/ui/input/search';
import { PAGE_SIZE } from '@/constants';
import { CommonParams } from '@/types';
import { useRouter } from 'next/router';

export type OnChangeFilter<DataFilterType> = (
  newValue: Partial<DataFilterType>,
  backToFirstPage?: boolean
) => void;

export type OnChangePage = (page: number, pageSize: number) => void;

export type TOnSearch = {
  backToFirstPage?: boolean;
} & OnSearchType;

export type UseFilter<DataFilterType> = {
  dataFilter: DataFilterType;
  onChangeFilter: OnChangeFilter<DataFilterType>;
  onChangePage: OnChangePage;
  onSearch: TOnSearch;
};

export const useFilter = <DataFilterType extends CommonParams>(
  defaultFilter: DataFilterType
): UseFilter<DataFilterType> => {
  const router = useRouter();

  const dataFilter: DataFilterType = {
    ...defaultFilter,
    ...router.query,
  };

  const syncParamsToURL = (params: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...params,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const onChangePage: OnChangePage = (page: number) => {
    const offset = PAGE_SIZE * (page - 1);
    const limit = PAGE_SIZE * page;
    syncParamsToURL({
      offset,
      limit,
    });
  };

  const onSearch: OnSearchType = (e) => {
    const keyword = e.target.value?.trim();
    syncParamsToURL({
      keyword,
      offset: defaultFilter.offset,
      limit: defaultFilter.limit,
    });
  };

  const onChangeFilter: OnChangeFilter<DataFilterType> = (
    newValue,
    backToFirstPage = true
  ) => {
    const pageParams = backToFirstPage
      ? {
          offset: defaultFilter.offset,
          limit: defaultFilter.limit,
        }
      : {};

    syncParamsToURL({
      ...pageParams,
      ...newValue,
    });
  };

  const removeNullValue = (filter: DataFilterType) => {
    for (const key in filter) {
      if (!filter[key] && filter[key] !== 0) {
        delete filter[key];
      }
    }
  };

  removeNullValue(dataFilter);

  return {
    dataFilter,
    onChangeFilter,
    onChangePage,
    onSearch,
  };
};
