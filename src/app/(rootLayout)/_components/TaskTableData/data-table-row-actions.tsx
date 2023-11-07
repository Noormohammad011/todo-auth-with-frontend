'use client'
import { Row } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { TaskType } from '@/types'
import { useDeleteTaskMutation } from '@/redux/features/tasks/tasksApi'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import UpdateTodoCard from '../UpdateTodo/UpdateTodo'

interface DataTableRowActionsProps<TData> {
  row: Row<TData> & { original: TaskType }
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row && row.original?._id
  const [deleteTask, { isLoading }] = useDeleteTaskMutation()
  const handleDeleteTask = async () => {
    toast.loading('Deleting task...')
    try {
      await deleteTask(id).unwrap()
      toast.success('Task deleted successfully')
    } catch (err: any) {
      for (const error of err?.data?.errorMessages) {
        toast.error(error.message)
      }
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' className='w-full'>
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <UpdateTodoCard id={id} />
            </DialogContent>
          </Dialog>
        </>
        <DropdownMenuItem disabled={isLoading} onClick={handleDeleteTask}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
