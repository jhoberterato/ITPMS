import React, { useEffect } from 'react'
import {  Dialog, Alert, useTheme} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { errorDialogActions } from '../redux/actions'


const ErrorDialog = () => {
    const theme = useTheme()
    const open = useSelector((state) => state.errorDialog.isOpen)
    const message = useSelector((state) => state.errorDialog.message)
    const dispatch =  useDispatch()
    const handleClose = (reason) => {
        if(reason !== "backdropClick"){
            dispatch(errorDialogActions.setIsOpen())
        }  
    }
   
    return (<>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'sm'}
        >
            <Alert severity='error'
                sx={{
                    border: '1px solid red',
                    background: theme.palette.mode === "light" ? 'rgb(253, 237, 237)' : 'rgb(95, 33, 32)',
                    color: theme.palette.mode === "light" ? 'rgb(95, 33, 32)': 'rgb(253, 237, 237)'
                }}
            >{message}</Alert>
        </Dialog>
    </>)
}

export default ErrorDialog