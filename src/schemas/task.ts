import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const taskValidation = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(5).max(255),
  isCompleted: z.boolean(),
})


export const updateTaskValidation = z.object({
  title: z.string().min(5).max(255).optional(),
  description: z.string().min(5).max(255).optional(),
  isCompleted: z.boolean().optional(),
})

export type TaskFormType = z.infer<typeof taskValidation>
export const taskResolver = zodResolver(taskValidation)


export type UpdateTaskFormType = z.infer<typeof updateTaskValidation>
export const updateTaskResolver = zodResolver(updateTaskValidation)