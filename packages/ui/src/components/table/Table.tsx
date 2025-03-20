import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  FilterFns,
  OnChangeFn,
  PaginationState,
  RowData,
  SortingFn,
  Table,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import React, { useContext } from 'react';

import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import Alert from '../alert/Alert';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line no-shadow
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
  interface TableMeta<TData extends RowData> {
    lengthOfData: number;
  }
}

type TTableContext<T> = {
  hook: Table<T> | null;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
};

function generateContext<T>() {
  return React.createContext<TTableContext<T>>({
    hook: null,
    globalFilter: '',
    setGlobalFilter: () => {},
  });
}

interface TableContextProviderProps<T> {
  children: React.ReactNode;
  data: Array<T>;
  columns: Array<ColumnDef<T, any>>;
  manualPagination?: boolean;
  visibility?: Record<string, boolean>;
}

let TableContext: React.Context<any> | null = null;

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function TableContextProvider<T>({
  children,
  data,
  columns,
  manualPagination = false,
  visibility,
}: TableContextProviderProps<T>) {
  TableContext = generateContext<T>();
  const [globalFilter, setGlobalFilter] = React.useState('');
  const hook = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      // columnFilters,
      globalFilter,
      columnVisibility: visibility,
    },
    meta: {
      lengthOfData: data?.length ?? 0,
    },
    // onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    manualPagination,
  });
  const value = React.useMemo(
    () => ({
      hook,
      globalFilter,
      setGlobalFilter,
    }),
    [globalFilter, hook]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

interface TableProps<T> {
  href: string;
  children: React.ReactNode;
  data: Array<T>;
  columns: Array<ColumnDef<T, any>>;
  manualPagination?: boolean;
  visibility?: Record<string, boolean>;
  alertContent?: {
    title?: string;
    text?: string;
  };
}

export function useTable<T>() {
  const { hook } = useContext(TableContext as React.Context<TTableContext<T>>);
  return hook;
}

export function useGlobalFilter() {
  const { globalFilter, setGlobalFilter } = useContext(
    TableContext as React.Context<TTableContext<any>>
  );
  return [globalFilter, setGlobalFilter] as const;
}

export default function TableComponent<T>({
  href,
  children,
  data,
  columns,
  visibility = {},
  manualPagination = false,
  alertContent = {
    title: 'No results found',
    text: 'No results found for the requested search',
  },
}: TableProps<T>) {
  return (
    <TableContextProvider<T>
      data={data?.length > 0 ? data : []}
      columns={columns}
      visibility={visibility}
      manualPagination={manualPagination}
    >
      {children}
      {/* TODO: agregar un alert que diga cuando la tabla está vacía */}
    </TableContextProvider>
  );
}
