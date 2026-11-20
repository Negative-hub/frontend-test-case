import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from '../../api/user'

export const fetchUser = createAsyncThunk('user/fetchUser', getUser, {
  condition: (_, { getState }) => {
    const state = getState()
    return state.user.status === 'idle'
  },
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectUser = (state) => state.user.data

export default userSlice.reducer
