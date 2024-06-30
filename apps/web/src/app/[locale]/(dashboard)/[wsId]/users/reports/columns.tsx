'use client';

import { UserReportRowActions } from './row-actions';
import { WorkspaceUserReport } from '@/types/db';
import { DataTableColumnHeader } from '@repo/ui/components/ui/custom/tables/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import Link from 'next/link';

export const getUserReportColumns = (
  t: any
): ColumnDef<WorkspaceUserReport>[] => [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('id')} />
    ),
    cell: ({ row }) => <div className="line-clamp-1">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'user_id',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('user_id')} />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.getValue('user_id')}</div>
    ),
  },
  {
    accessorKey: 'user_name',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('user_name')} />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 min-w-[8rem] max-w-[24rem]">
        {row.getValue('user_name') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('title')} />
    ),
    cell: ({ row }) => (
      <Link
        href={row.original.href || '#'}
        className="line-clamp-2 min-w-[8rem] max-w-[24rem] hover:underline"
      >
        {row.getValue('title') || '-'}
      </Link>
    ),
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('content')} />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 min-w-[8rem] whitespace-pre-wrap">
        {row.getValue('content') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'feedback',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('feedback')} />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 min-w-[8rem] whitespace-pre-wrap">
        {row.getValue('feedback') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'creator_name',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('creator_name')} />
    ),
    cell: ({ row }) => (
      <div className="min-w-[8rem]">{row.getValue('creator_name') || '-'}</div>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('updated_at')} />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue('updated_at')
          ? moment(row.getValue('updated_at')).format('DD/MM/YYYY, HH:mm:ss')
          : '-'}
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader t={t} column={column} title={t('created_at')} />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue('created_at')
          ? moment(row.getValue('created_at')).format('DD/MM/YYYY, HH:mm:ss')
          : '-'}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserReportRowActions row={row} />,
  },
];
