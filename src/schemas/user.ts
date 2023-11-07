import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const LoginValidation = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(5, 'Password must have than 5 characters'),
})

export const SignUpValidation = z
  .object({
    name: z.string().min(1, 'name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(5, 'Password must have than 5 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  })

const resetPassword = z.object({
  oldPassword: z
    .string({
      required_error: 'Old Password is required',
    })
    .min(1, 'Password is required')
    .min(5, 'Password must have than 5 characters'),
  newPassword: z
    .string({
      required_error: 'New Password is required',
    })
    .min(1, 'Password is required')
    .min(5, 'Password must have than 5 characters'),
})

export type LoginFormType = z.infer<typeof LoginValidation>
export const loginResolver = zodResolver(LoginValidation)

export type SignUpFormType = z.infer<typeof SignUpValidation>
export const signUpResolver = zodResolver(SignUpValidation)

export type ResetPasswordFormType = z.infer<typeof resetPassword>
export const resetPasswordResolver = zodResolver(resetPassword)
