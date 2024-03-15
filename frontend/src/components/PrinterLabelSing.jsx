import { Check, CheckBox } from '@mui/icons-material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { ComponentToPrint } from './PrinterLabel/ComponentToPrint'
import { styled } from '@mui/material/styles';
import { Button, useTheme} from '@mui/material';
import { tokens } from '../themes';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useSelector } from 'react-redux';

const PrinterLabelSing = (printerID) => {
    const componentRef = useRef(null)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [data, setData] = useState([])
    const selectedDate = useSelector(state => state.calendar.printerSelectedDate)
    const user = useSelector(state => state.user.userInfo)
    const pic = `${user.FirstName[0].toLowerCase()}${user.LastName.toLowerCase()}`
    const location = useSelector(state => state.calendar.printerSelectedLocation)
    const formatDate = (date) => {
        const year = new Date(date).getFullYear()
        const month = String(new Date(date).getMonth() + 1).padStart(2, '0')
        const day = String(new Date(date).getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }
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
        startIcon={<BookmarkBorderOutlinedIcon />} 
        sx={{ background: colors.blueAccent[700], color: colors.grey[100], width: '90px', height: '30px', ml: '10px'}}
    >Label</CustButton>
    }, [])

    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })
    useEffect(() => {
        setData([])
        const getData = async() => {
            //await window.$post("printer/getForPMList", {date: selectedDate, location: tabs[index].location, category: category})
            const res = await window.$post("printer/getLabelDetails", {
                id: printerID.printerID,
                pmDate: selectedDate,
                location: location
            })
            setData((prev) => [{
                model: res.data.data[0].Model,
                serial: res.data.data[0].SerialNumber,
                pmDate: res.data.data[0].PMDate,
                pmBy: res.data.data[0].PIC == null ? pic : res.data.data[0].PIC,
                dueDate: res.data.data[0].NextPMDate,
                location: res.data.data[0].Location
            }])
        }
        getData()
    }, [])
    return (<>
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
    </>)
}

export default PrinterLabelSing