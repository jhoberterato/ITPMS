import React, {useImperativeHandle, forwardRef, useEffect} from 'react'
import { Box, Modal, Button, useTheme, Typography, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { openChildModalActions, openGrandChildModalActions } from '../redux/actions';
import { tokens } from '../themes';
import SignaturePadComp from './SignaturePadComp';

function GrandChildModal(widthProps, heightProps){
    const openGrandChildModal = useSelector((state) => state.grandChildModal.openGrandChildModal)
    const dispatch = useDispatch()

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const handleClose = (e, reason) => {
        if(reason !== "backdropClick"){
            dispatch(openGrandChildModalActions.setOpenGrandChildModal())
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        height: heightProps,
        background: colors.primary[400],
        borderRadius: '10px',
        border: `2px solid ${colors.blueAccent[700]}`,
        p: '12px'
    }
    return (
        <React.Fragment>
            <Modal
                open={openGrandChildModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
            <Box sx={style}>
                <Box p={'20px'}>
                   <SignaturePadComp />
                </Box>
            </Box>
            </Modal>
        </React.Fragment>
    )
}

function ChildModal({widthProps, heightProps, childTitle, grandChildren}) {
    const openChildModal = useSelector((state) => state.childModal.openChildModal)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()
    
    const handleClose = (e, reason) => {
        if(reason !== "backdropClick"){
            dispatch(openChildModalActions.setOpenChildModal())
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: widthProps,
        height: heightProps,
        background: colors.primary[400],
        borderRadius: '10px',
        border: `2px solid ${colors.blueAccent[700]}`,
        p: '12px'
    }

    useEffect(() => {
        //console.log(pmID)
    }, [])
    return (
        <React.Fragment>
            <Modal
                open={openChildModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
            <Box sx={style}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography
                        variant='h3'
                        color={colors.grey[100]}
                        fontWeight={'bold'}
                        sx={{mb: '5px'}}
                    >{childTitle}</Typography>
                    <IconButton onClick={handleClose} sx={{background: colors.grey[800]}}>
                        <CloseOutlinedIcon sx={{color: colors.grey[100]}}/>
                    </IconButton>
                </Box>
                <Box p={'20px'}>
                    {grandChildren}
                </Box>
                <GrandChildModal widthProps={widthProps}/>
            </Box>
            </Modal>
        </React.Fragment>
    );
}
const NestedModal = forwardRef(({children, title, heightProps, widthProps, childTitle, grandChildren}, ref) => {
    const [open, setOpen] = React.useState(false)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = (e, reason) => {
        if(reason !== "backdropClick"){
            setOpen(false);
        }
    }
    useImperativeHandle(ref, () => ({handleOpen}))
    const style = {
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
        '&:focus': {
            border: `2px solid ${colors.blueAccent[700]}`,
        }
    }
    return (<>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={style}>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography
                            variant='h3'
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
                    <ChildModal
                        widthProps={widthProps}
                        heightProps={heightProps}
                        childTitle={childTitle}
                        grandChildren={grandChildren}
                    />
                </Box>
            </Modal>
        </div>
    </>)
})

export default NestedModal