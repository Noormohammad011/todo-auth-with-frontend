'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import { UpdateTaskFormType, updateTaskResolver } from '@/schemas/task'
import { Checkbox } from '@/components/ui/checkbox'
import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from '@/redux/features/tasks/tasksApi'

const UpdateTodoCard = ({ id }: { id: string }) => {
  const router = useRouter()
  const { email } = useAppSelector((state) => state.auth)
  const [updateTask, {data:upData, isLoading }] = useUpdateTaskMutation()
  const { data, refetch } = useGetTaskQuery(id)
  useEffect(() => {
    if (email === undefined || !email) {
      toast.error('Please login first')
      router.push('/login')
    }
  }, [email, router])

  const form = useForm<UpdateTaskFormType>({
    resolver: updateTaskResolver,
    defaultValues: {
      title: upData ? upData?.title : data?.title ,
      description: upData ? upData?.description : data?.description,
      isCompleted: upData ? upData?.isCompleted : data?.isCompleted,
    },
    values: {
      title: upData ? upData?.title : data?.title ,
      description: upData ? upData?.description : data?.description,
      isCompleted: upData ? upData?.isCompleted : data?.isCompleted,
    },
  })

  const onSubmit = async (values: UpdateTaskFormType) => {
    toast.loading('Updating task...')
    try {
      const response = await updateTask({ _id: data?._id, ...values }).unwrap()
      if (!!response) {
        toast.success('Task updated successfully')
        refetch()
      }
      form.reset()
      router.push('/')
    } catch (err: any) {
      for (const error of err?.data?.errorMessages) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>Update Task</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Enter title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isCompleted'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormLabel>IsCompleted</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} className='w-full mt-6' type='submit'>
              Update Task
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default UpdateTodoCard
