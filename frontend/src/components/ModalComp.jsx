import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Box, Button, Typography, Modal, useTheme, IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { styled } from '@mui/material/styles';
import { tokens } from '../themes'
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../redux/actions';

const ModalComp = forwardRef(({children, isShow, title, buttonOpenName, heightProps, widthProps}, ref) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const open = useSelector((state) => state.modal.openModal)
    const dispatch = useDispatch()
    const handleOpen = () => {
        dispatch(modalActions.setOpenModal())
    }
    const handleClose = (e, reason) => {
        if(reason !== "backdropClick"){
            dispatch(modalActions.setOpenModal())
        }
    }
    
    useImperativeHandle(ref, () => ({handleOpen}))
    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.greenAccent[500]
        }
    })
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: widthProps,
        height: heightProps,
        background: colors.primary[400],
        borderRadius: '10px',
        border: `2px solid ${colors.blueAccent[700]}`,
        p: '12px',
    }
    return (<>
        <div style={{display: 'flex', marginBottom: '10px'}}>
            <CustButton onClick={handleOpen}
                sx={{
                    color: colors.grey[100],
                    background: colors.greenAccent[600],
                    display: isShow ? undefined: 'none'
                }}
            >{buttonOpenName}</CustButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
                        <Typography variant='h3'
                            color={colors.grey[100]}
                            fontWeight={'bold'}
                            sx={{mb: '5px'}}
                        >{title}</Typography>
                        <IconButton onClick={handleClose} sx={{background: colors.grey[800]}}>
                            <CloseOutlinedIcon sx={{color: colors.grey[100]}}/>
                        </IconButton>
                    </Box>
                    <Box p={"20px"}>
                        {children}
                    </Box>
                </Box>
            </Modal>
        </div>
    </>)
})

export default ModalComp