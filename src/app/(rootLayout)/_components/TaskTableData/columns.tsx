'use client'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { TaskType } from '@/types'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<TaskType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Task ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    accessorKey: '_id',
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    accessorKey: 'title',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    accessorKey: 'isCompleted',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
