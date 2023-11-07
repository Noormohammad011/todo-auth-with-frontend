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
import { SignUpFormType, signUpResolver } from '@/schemas/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useUserSignupMutation } from '@/redux/features/auth/authApi'

const RegisterCard = () => {
  const [userSignup, { isLoading }] = useUserSignupMutation()
  const router = useRouter()
  const form = useForm<SignUpFormType>({
    resolver: signUpResolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async(values: SignUpFormType) => {
    toast.loading('Logging in...')
    try {
      const response = await userSignup({ ...values }).unwrap()
      console.log(response)
      if (!!response) {
        router.push(`/login`)
        toast.success('Registration successfully')
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
          Register with credientials
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='john doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Re-Enter your password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className='text-sm text-gray-600 mt-2'>
              If you have an account, please&nbsp;
              <Link className='text-blue-500 hover:underline' href='/login'>
                Sign in
              </Link>
            </p>
            <Button className='w-full mt-6' type='submit'>
              Registration
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default RegisterCard
