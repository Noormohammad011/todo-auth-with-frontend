export interface IMeta {
  limit: number
  page: number
  total: number
}

export type ResponseSuccessType = {
  data: any
  meta?: IMeta
}

export type IGenericErrorMessage = {
  path: string | number
  message: string
}

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type TaskType = {
  _id: string
  title: string
  description: string
  user: {
    _id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    id: string
  }
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}
