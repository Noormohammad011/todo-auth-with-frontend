'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { ResetPasswordFormType, resetPasswordResolver } from '@/schemas/user'
import { useRouter } from 'next/navigation'
import { useChangePasswordMutation } from '@/redux/features/auth/authApi'
import { toast } from 'sonner'

const ChangePasswordCard = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const router = useRouter()
  const form = useForm<ResetPasswordFormType>({
    resolver: resetPasswordResolver,
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = async (values: ResetPasswordFormType) => {
    toast.loading('Password changing....')
    try {
      const response = await changePassword({ ...values }).unwrap()
      console.log(response)
      if (response?.accessToken) {
        router.push(`/`)
        toast.success('Password changed successfully')
      }
    } catch (err: any) {
      for (const error of err?.data?.errorMessages) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>Change Password</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='oldPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your old password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your new password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} className='w-full mt-6' type='submit'>
              Change Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default ChangePasswordCard
