import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Box, Button, Typography, Modal, useTheme, IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { tokens } from '../themes'

const RefModal = forwardRef(({children, title, heightProps, widthProps}, ref) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [open, setOpen] = useState(false)
    useImperativeHandle(ref, () => ({handleOpen}))
    const parentRef = useRef()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = (e, reason) => {
        if(reason !== "backdropClick"){
            setOpen(false)
        }
    }
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

export default RefModal