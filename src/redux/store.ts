import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import { reducer } from './rootReducer'
import { getUserInfo } from '@/services/auth.service'
const user = getUserInfo() as any
export const store = configureStore({
  reducer,
  preloadedState: {
    auth: {
      _id: user._id,
      email: user.email,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
