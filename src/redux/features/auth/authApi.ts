import { getUserInfo, storeUserInfo } from '@/services/auth.service'
import { TagTypes } from '../../tag-types'
import { baseApi } from '../../api/baseApi'
import { userLoggedIn } from './authSlice'

const AUTH_URL = '/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        data: loginData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          storeUserInfo({ accessToken: data?.accessToken })
          const user = getUserInfo() as any
          dispatch(
            userLoggedIn({
              _id: user?._id,
              email: user?.email,
            })
          )
        } catch (err) {
          console.log(err)
        }
      },
      invalidatesTags: [TagTypes.user],
    }),
    userSignup: build.mutation({
      query: (signUpData) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        data: signUpData,
      }),
      invalidatesTags: [TagTypes.user],
    }),
    changePassword: build.mutation({
      query: (changePasswordData) => ({
        url: `${AUTH_URL}/reset-password`,
        method: 'POST',
        data: changePasswordData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          storeUserInfo({ accessToken: data?.accessToken })
          const user = getUserInfo() as any
          dispatch(
            userLoggedIn({
              _id: user?._id,
              email: user?.email,
            })
          )
        } catch (err) {
          console.log(err)
        }
      },
      invalidatesTags: [TagTypes.user],
    }),
    profile: build.query({
      query: () => ({
        url: `${AUTH_URL}/me`,
        method: 'GET',
      }),
      providesTags: [TagTypes.user],
    }),
  }),
})

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useProfileQuery,
  useChangePasswordMutation,
} = authApi
