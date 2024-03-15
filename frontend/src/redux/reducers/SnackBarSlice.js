import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
    name: 'openSnackBar',
    initialState: {
        openSnackBar: true,
        snackBarMessage: ''
    },
    reducers: {
        setOpenSnackBar: (state, action) => {
            state.openSnackBar = !state.openSnackBar
        },
        setOpenSnackBarForce: (state, action) => {
            state.openSnackBar = true
        },
        setSnackBarMessage: (state, action) => {
            state.snackBarMessage = action.payload
        }
    }
})