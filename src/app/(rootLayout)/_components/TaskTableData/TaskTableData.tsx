'use client'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TaskDataTable from './data-table'
import { columns } from './columns'
import { useGetTasksQuery } from '@/redux/features/tasks/tasksApi'
const TaskTableData = () => {
  const { data} = useGetTasksQuery()
  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>
          Task Table
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <TaskDataTable columns={columns} data={data ? data : []} />
      </CardContent>
    </Card>
  )
}

export default dynamic(() => Promise.resolve(TaskTableData), { ssr: false })
