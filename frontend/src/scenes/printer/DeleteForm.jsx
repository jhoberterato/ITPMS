import React from 'react'
import { Alert, AlertTitle, useTheme, DialogActions, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from '../../themes'
import ErrorDialog from '../../components/ErrorDialog'
import { modalActions, errorDialogActions, snackBarActions, printerActions } from '../../redux/actions';

const DeleteForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()
    const deleteID = useSelector((state) => state.printer.deleteID)
    const handleClose = (e, reason) => {
        if(reason !== 'backdropClick'){
            dispatch(modalActions.setCloseDeleteDialog())
        }
    }
    const handleDelete = async () => {
        console.log(deleteID)
        const del = await window.$post('printer/deletePrinter', {id: deleteID})
        if(del.data.status === "success"){
            dispatch(printerActions.setDeleteID(0))
            dispatch(snackBarActions.setSnackBarMessage("PC/Laptop deleted successfully!"))
            dispatch(snackBarActions.setOpenSnackBarForce())
            dispatch(modalActions.setCloseDeleteDialog())
            // setTimeout(() => {
                
            // }, 5000);
            window.location.reload()
        }
        else{
            dispatch(errorDialogActions.setMessage(del.data.message))
            dispatch(errorDialogActions.setIsOpen())
        }
    }
    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })
    return (<>
        <ErrorDialog />
        <Alert severity="warning" sx={{
            background: theme.palette.mode === "dark" ? "rgb(102, 60, 0)" : "rgb(255, 244, 229)"
        }}>
            <AlertTitle>Warning</AlertTitle>
            Are you sure you want to delete selected pc/laptop?.
            Clicking confirm will permanently delete all records including history details.
        </Alert>
        <DialogActions sx={{
            //background: colors.grey[00]
        }}>
            <CustButton variant={"outlined"}
                onClick={handleDelete}
                sx={{
                    background: colors.redAccent[700],
                    border: `1px solid ${colors.redAccent[700]}`,
                    color: colors.grey[100],
                    ml: '5px',
                    '&:hover': {
                        background: colors.redAccent[600],
                        border: `1px solid ${colors.redAccent[600]}`,
                    }
                }}
            >Confirm Remove</CustButton>
            <CustButton variant={"outlined"}
                onClick={handleClose}
                sx={{
                    background: colors.redAccent[700],
                    border: `1px solid ${colors.redAccent[700]}`,
                    color: colors.grey[100],
                    ml: '5px',
                    '&:hover': {
                        background: colors.redAccent[600],
                        border: `1px solid ${colors.redAccent[600]}`,
                    }
                }}
            >Cancel</CustButton>
        </DialogActions>
    </>)
}

export default DeleteForm