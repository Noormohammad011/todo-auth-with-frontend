import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUserState {
  _id: string | null
  email: string | null
}

const initialState: IUserState = {
  _id: null,
  email: null,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<IUserState>) => {
      state._id = action.payload._id
      state.email = action.payload.email
    },
  },
})

export const { userLoggedIn } = authSlice.actions

export default authSlice.reducer
