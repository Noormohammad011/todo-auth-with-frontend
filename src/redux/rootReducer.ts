import { baseApi } from './api/baseApi'
import authSlice from './features/auth/authSlice'

export const reducer = {
  auth: authSlice,
  [baseApi.reducerPath]: baseApi.reducer,
}
