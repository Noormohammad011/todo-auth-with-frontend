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
import { TaskFormType, taskResolver } from '@/schemas/task'
import { Checkbox } from '@/components/ui/checkbox'
import { useCreateTaskMutation } from '@/redux/features/tasks/tasksApi'

const CreateTodoCard = () => {
  const router = useRouter()
  const { email } = useAppSelector((state) => state.auth)
  const [createTask, { isLoading }] = useCreateTaskMutation()
  useEffect(() => {
    if (email === undefined || !email) {
      toast.error('Please login first')
      router.push('/login')
    }
  }, [email, router])

  const form = useForm<TaskFormType>({
    resolver: taskResolver,
    defaultValues: {
      title: '',
      description: '',
      isCompleted: false,
    },
  })

  const onSubmit = async (values: TaskFormType) => {
    toast.loading('Creating task...')
    try {
      const response = await createTask({ ...values }).unwrap()
      if (!!response) {
        toast.success('Task created successfully')
      }
      form.reset()
    } catch (err: any) {
      for (const error of err?.data?.errorMessages) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>Create Todo Task</CardTitle>
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
              Create Task
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default CreateTodoCard
