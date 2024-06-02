import {createSlice} from '@reduxjs/toolkit'

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    messages: null,
    selectedConversation: null
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setMessages, setSelectedConversation} = conversationSlice.actions

export default conversationSlice.reducer