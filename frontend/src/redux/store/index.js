import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { openChilModalSlice, openGrandChilModalSlice } from "../reducers/NestedModal";
import { userSlice } from "../reducers/UserSlice";
import { modalSLice } from "../reducers/ModalSlice"
import { snackBarSlice } from "../reducers/SnackBarSlice";
import { errorDialogSlice } from "../reducers/ErrorDialogSlice";
import { pcSlice } from "../reducers/PCSlice";
import { printerSlice } from "../reducers/PrinterSlice";
import { calendarSlice } from "../reducers/CalendarSlice";

const reducer = combineReducers({
    childModal: openChilModalSlice.reducer,
    grandChildModal: openGrandChilModalSlice.reducer,
    user: userSlice.reducer,
    modal: modalSLice.reducer,
    snackBar: snackBarSlice.reducer,
    errorDialog: errorDialogSlice.reducer,
    pc: pcSlice.reducer,
    printer: printerSlice.reducer,
    calendar: calendarSlice.reducer
})

const store = configureStore({
    reducer: reducer,
    middleware: () => new Tuple(thunk)
})
export default store
