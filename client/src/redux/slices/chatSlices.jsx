import { createSlice } from "@reduxjs/toolkit";

export const chatSlices = createSlice({
    name:"chatslices",
    initialState:{
        chatId: 0,
        friendId: 0
    },
    reducers:{
        saveChatId: (state, action) => {
            state.chatId = action.payload
        },
        saveFriendId: (state, action) => {
            state.friendId = action.payload
        }
    }
})

const saveChatData = chatSlices.reducer

export const {saveChatId, saveFriendId} = chatSlices.actions
export default saveChatData