import React from 'react'
import { Dialog } from '@mui/material/';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../redux/actions';

const DeleteDialog = ({children}) => {
    const open = useSelector((state) => state.modal.openDeleteDialog)
    const dispatch = useDispatch()
    const handleClose = (e, reason) => {
        if(reason !== 'backdropClick'){
            dispatch(modalActions.setCloseDeleteDialog())
        }
    }
    return (<>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {children}
            
        </Dialog>
    </>)
}

export default DeleteDialog