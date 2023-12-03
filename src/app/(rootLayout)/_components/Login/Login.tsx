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
import { LoginFormType, loginResolver } from '@/schemas/user'
import { useRouter } from 'next/navigation'
import { useUserLoginMutation } from '@/redux/features/auth/authApi'
import { toast } from 'sonner'

const LoginCard = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation()

  const router = useRouter()
  const form = useForm<LoginFormType>({
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormType) => {
    toast.loading('Logging in...')
    try {
      const response = await userLogin({ ...values }).unwrap()
      if (response?.accessToken) {
        router.push(`/`)
        toast.success('Login successfully')
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
        <CardTitle className='text-2xl text-center'>
          Login with credientials
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='mail@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className='text-sm text-gray-600 mt-2'>
              If you don&apos;t have an account, please&nbsp;
              <Link className='text-blue-500 hover:underline' href='/register'>
                Sign up
              </Link>
            </p>
            <Button
              disabled={isLoading}
              className='w-full mt-6'
              type='submit'
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default LoginCard
