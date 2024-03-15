import { createSlice } from "@reduxjs/toolkit";

export const modalSLice = createSlice({
    name: 'openModal',
    initialState: {
        openModal: false,
        openEditModal: false,
        editModalComp : 'edit',
        openDeleteDialog: false
    },
    reducers: {
        setOpenModal(state){
            state.openModal = !state.openModal
        },
        setOpenEditModal(state){
            state.openEditModal = true
        },
        setCloseEditModal(state){
            state.openEditModal = false
        },
        setEditModalComp(state, action){
            state.editModalComp = action.payload
        },
        setOpenDeleteDialog(state, action){
            state.openDeleteDialog = true
        },
        setCloseDeleteDialog(state, action){
            state.openDeleteDialog = false
        },
    }
})


