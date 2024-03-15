import { Check, CheckBox } from '@mui/icons-material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactToPrint from 'react-to-print'
import { ComponentToPrint } from './ComponentToPrint'
import { styled } from '@mui/material/styles';
import { Button, useTheme} from '@mui/material';
import { tokens } from '../themes';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';

const LabelComp = (type) => {
    const componentRef = useRef(null)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const data = useSelector(state => state.pc.pcForPrintLabelMultiple)
    const onBeforeGetContentResolve = useRef(null)

    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("old text")

    const handleAfterPrint = useCallback(() => {
        console.log("test")
    }, [])

    const handleBeforePrint = useCallback(() => {
        console.log("test")
    }, [])

    const handleOnBeforeGetContent = useCallback(() => {
        setLoading(true)
        setText("New Test")

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve

            setTimeout(() => {
                setLoading(false)
                setText("new text")
                resolve()
            }, 2000);
        })
    }, [setLoading, setText])

    useEffect(() => {
        if(text === "new text" && typeof onBeforeGetContentResolve.current === "function"){
            onBeforeGetContentResolve.current()
        }
    }, [onBeforeGetContentResolve.current, text])

    const reactToPrintContent = useCallback(() => {
        return componentRef.current
    }, [componentRef.current])

    const reactToPrintTrigger = useCallback(() => {
        return <CustButton variant={"contained"}
        startIcon={<StyleOutlinedIcon />} 
        sx={{ background: colors.blueAccent[700], color: colors.grey[100], width: '170px', height: '30px', ml: '10px'}}
    >Print Labels</CustButton>
    }, [])

    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })
  return (
    <>
        <ReactToPrint
            content={reactToPrintContent}
            documentTitle='PM Label'
            trigger={reactToPrintTrigger}
        />
        <div style={{display: 'none'}}>
            <ComponentToPrint ref={componentRef} text={data} />
        </div>
        
    </>
  )
}

export default LabelComp