import { createSlice } from "@reduxjs/toolkit";

export const openChilModalSlice = createSlice({
    name: 'openChildModal',
    initialState: {
        openChildModal: false,
    },
    reducers: {
        setOpenChildModal(state){
            state.openChildModal = !state.openChildModal
        },
    }
})

export const openGrandChilModalSlice = createSlice({
    name: 'openGrandChildModal',
    initialState: {
        openGrandChildModal: false,
    },
    reducers: {
        setOpenGrandChildModal(state){
            state.openGrandChildModal = !state.openGrandChildModal
        },
    }
})

