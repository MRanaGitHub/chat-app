import {createSlice} from '@reduxjs/toolkit'

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {
    value: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setAuthUser} = authUserSlice.actions

export default authUserSlice.reducer