import { Check, CheckBox } from '@mui/icons-material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { ComponentToPrint } from './PrinterLabel/ComponentToPrint'
import { styled } from '@mui/material/styles';
import { Button, useTheme} from '@mui/material';
import { tokens } from '../themes';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useSelector } from 'react-redux';

const PrinterCheckList = ({handleClick}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })

    return (<>
        <CustButton variant={"contained"}
            onClick={handleClick}
            startIcon={<ChecklistOutlinedIcon />} 
            sx={{ background: colors.blueAccent[700], color: colors.grey[100], width: '120px', height: '30px', ml: '10px'}}
        >Checklist</CustButton>
    </>)
}

export default PrinterCheckList