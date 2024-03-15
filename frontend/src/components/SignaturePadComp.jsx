import React, {useEffect, useRef, useState} from 'react'
import SignaturePad from "react-signature-canvas"
import { tokens } from '../themes'
import { useTheme, Button, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import { openGrandChildModalActions, snackBarActions, errorDialogActions, openChildModalActions } from '../redux/actions'
import ErrorDialog from './ErrorDialog';
import img from "../assets/images/nmcp.png"


// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: mimeString });  
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SignaturePadComp = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    let sigPad = useRef({})
    const [data, setData] = useState('')
    const [hasSigned, setHasSigned] = useState(false)
    const pmDetails = useSelector(state => state.pc.pcPMDetailsForSubmit)
    const pcID = useSelector(state => state.calendar.pcIDForPM)
    const handleClear = () => {
        sigPad.current.clear()
        setHasSigned(false)
    }
    const handleSave = async (e) => {
        e.preventDefault()
        if(hasSigned){
            setData((prev) => (prev = sigPad.current.toDataURL()))
            const imageUrl = sigPad.current.toDataURL()
            const blob = dataURItoBlob(imageUrl)
            const file = new File([blob], 'image.png', {type: 'image/jpeg'})
            let formData = new FormData()
            formData.append("id", pmDetails.id)
            formData.append("pcID", pcID)
            formData.append("internetAccess", pmDetails.internetAccess)
            formData.append("softwareInstalled", pmDetails.softwareInstalled)
            formData.append("virusUpdate", pmDetails.virusUpdate)
            formData.append("virusRemoval", pmDetails.virusRemoval)
            formData.append("diskCleanup", pmDetails.diskCleanup)
            formData.append("empytRecycleBin", pmDetails.empytRecycleBin)
            formData.append("clearTempFiles", pmDetails.clearTempFiles)
            formData.append("kmMouseFunctionality", pmDetails.kmMouseFunctionality)
            formData.append("inboxMaintenance", pmDetails.inboxMaintenance)
            formData.append("spamMailRemoval", pmDetails.spamMailRemoval)
            formData.append("emailSampling", pmDetails.emailSampling)
            formData.append("businessProcessRelated", pmDetails.businessProcessRelated)
            formData.append("offense", pmDetails.offense)
            formData.append("chainEmails", pmDetails.chainEmails)
            formData.append("windowsUpdate", pmDetails.windowsUpdate)
            formData.append("pic", pmDetails.pic)
            formData.append("remarks", pmDetails.remarks)
            formData.append("file", file)
            const data = await window.$post("pc/submitPM", formData)
            if(data.data.status === "success"){

                dispatch(openChildModalActions.setOpenChildModal())
                dispatch(openGrandChildModalActions.setOpenGrandChildModal())
                dispatch(snackBarActions.setSnackBarMessage("PM submitted successfully!"))
                dispatch(snackBarActions.setOpenSnackBarForce())
            }
            else{
                dispatch(errorDialogActions.setMessage(data.data.message))
                dispatch(errorDialogActions.setIsOpen())
            }
        }
        else{
            dispatch(errorDialogActions.setMessage("Sign is required!"))
            dispatch(errorDialogActions.setIsOpen())
        }        
    }

    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch(openGrandChildModalActions.setOpenGrandChildModal())
    }
    return (<>
        <Typography variant='h5' color={colors.grey[500]} fontWeight={"bolder"}>User's Acknowledgement</Typography>
        <ErrorDialog />
        <form onSubmit={handleSave} encType='multipart/form-data'>
            <div onClick={() => setHasSigned(true)}>
                <SignaturePad ref={sigPad} penColor={colors.primary[100]}
                    canvasProps={{
                    className: 'signature'
                    }}
                    
                />
            </div>
            
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Button
                    variant='contained'
                    sx={{
                        background: colors.blueAccent[600],
                        color: colors.grey[100],
                        '&:hover': {
                            background: colors.blueAccent[500]
                        }
                    }}
                    onClick={handleClear}
                >Clear</Button>
                <Box display={'flex'} justifyContent={'space-around'}>
                    <Button
                        variant='contained'
                        sx={{
                            background: colors.greenAccent[600],
                            color: colors.grey[100],
                            '&:hover': {
                                background: colors.greenAccent[500]
                            }
                        }}
                        type='submit'
                    >SUBMIT</Button>
                    <Button
                        variant='contained'
                        sx={{
                            background: "red",
                            ml: '5px',
                            color: colors.grey[100],
                            '&:hover': {
                                background: "red"
                            }
                        }}
                        onClick={handleCancel}
                    >Cancel</Button>
                </Box>
            </Box>
        </form>
         
        
    </>)
}

export default SignaturePadComp