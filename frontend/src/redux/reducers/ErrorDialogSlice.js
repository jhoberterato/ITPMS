import { createSlice } from "@reduxjs/toolkit";

export const errorDialogSlice = createSlice({
    name: 'errorDialog',
    initialState: {
        isOpen: false,
        message: ""
    },
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = !state.isOpen
        },

        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})