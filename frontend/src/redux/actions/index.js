import { openChilModalSlice, openGrandChilModalSlice } from "../reducers/NestedModal";
import { userSlice } from "../reducers/UserSlice";
import { modalSLice } from "../reducers/ModalSlice"
import { snackBarSlice } from "../reducers/SnackBarSlice";
import { errorDialogSlice } from "../reducers/ErrorDialogSlice";
import { pcSlice } from "../reducers/PCSlice";
import { printerSlice } from "../reducers/PrinterSlice";
import { calendarSlice } from "../reducers/CalendarSlice";
import { importPC } from "../reducers/PCSlice";

export const openChildModalActions = openChilModalSlice.actions
export const openGrandChildModalActions = openGrandChilModalSlice.actions
export const userActions = userSlice.actions
export const modalActions = modalSLice.actions
export const snackBarActions = snackBarSlice.actions
export const errorDialogActions = errorDialogSlice.actions
export const pcActions = pcSlice.actions
export const printerActions = printerSlice.actions
export const calendarActions = calendarSlice.actions
export {
    importPC
}