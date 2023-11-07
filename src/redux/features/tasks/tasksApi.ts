import { TagTypes } from '../../tag-types'
import { baseApi } from '../../api/baseApi'
import { TaskType } from '@/types'

const TASKS_URL = '/tasks'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (taskData) => ({
        url: TASKS_URL,
        method: 'POST',
        data: taskData,
      }),
      invalidatesTags: [TagTypes.tasks],
    }),
    getTasks: build.query({
      query: () => ({
        url: `${TASKS_URL}`,
        method: 'GET',
      }),
      providesTags: [TagTypes.tasks],
    }),
    getTask: build.query({
      query: (taskId) => {
        return {
          url: `${TASKS_URL}/${taskId}`,
          method: 'GET',
        }
      },
      providesTags: [TagTypes.tasks],
    }),
    deleteTask: build.mutation({
      query: (taskId) => ({
        url: `${TASKS_URL}/${taskId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (taskId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(
            tasksApi.util.updateQueryData('getTasks', {}, (draft) => {
              const index = draft?.tasks?.findIndex(
                (task: TaskType) => task._id === taskId
              )
              if (index !== undefined && index !== -1) {
                draft?.tasks?.splice(index, 1)
              }
            })
          )
          return Promise.resolve()
        } catch (error) {
          return Promise.reject(error)
        }
      },

      invalidatesTags: [TagTypes.tasks],
    }),
    updateTask: build.mutation({
      query: ({ _id, ...values }) => ({
        url: `${TASKS_URL}/${_id}`,
        method: 'PATCH',
        data: values,
      }),
      onQueryStarted: async (taskId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(
            tasksApi.util.updateQueryData('getTasks', {}, (draft) => {
              const index = draft?.tasks?.findIndex(
                (task: TaskType) => task._id === taskId
              )
              if (index !== undefined && index !== -1) {
                draft?.tasks?.splice(index, 1)
              }
            })
          )
          return Promise.resolve()
        } catch (error) {
          return Promise.reject(error)
        }
      },
      invalidatesTags: [TagTypes.tasks],
    }),
  }),
})

export const {
  useGetTaskQuery,
  useCreateTaskMutation,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi
