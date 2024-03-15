import React, { useEffect, useState } from 'react'
import { TextField, Box, Button, useTheme, FormControl, MenuItem, Select, InputLabel, FormHelperText, FormControlLabel, Checkbox } from '@mui/material'
import { initialValues, pmSchema, pmTextField } from './Data'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import  useMediaQuery  from '@mui/material/useMediaQuery'
import { Formik } from 'formik'
import { tokens } from '../../../themes'
import { useDispatch, useSelector } from 'react-redux';
import { openGrandChildModalActions, pcActions } from '../../../redux/actions';

const PMForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)    
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [tempVal, setTempVal] = useState("")
    const [isRemarksRequired, setIsRemarksRequired] = useState(false)
    const[isAppliedToAll, setApplyToAll] = useState(false)
    const pcForPM = useSelector((state) => state.calendar.pmIDForPM)
    const user = useSelector(state => state.user.userInfo)
    const pic = `${user.FirstName[0].toLowerCase()}${user.LastName.toLowerCase()}`
    const [details, setDetails] = useState({
        id: 0,
        internetAccess: "",
        softwareInstalled: "",
        virusUpdate: "",
        virusRemoval: "",
        diskCleanup: "",
        empytRecycleBin: "",
        clearTempFiles: "",
        kmMouseFunctionality: "",
        inboxMaintenance: "",
        spamMailRemoval: "",
        emailSampling: "",
        businessProcessRelated: "",
        offense: "",
        chainEmails: "",
        windowsUpdate: "",
        pic: pic,
        remarks: "",
    })
    const dispatch = useDispatch()
    
    const handleFormSubmit = (values) => {
        if(Object.values(values).includes("Error/Problem") && values.remarks === ""){
            console.log("awa ko naman")
            setIsRemarksRequired(true)
        }
        else{
            dispatch(pcActions.setPCPMDetailsForSubmit(values))
            dispatch(openGrandChildModalActions.setOpenGrandChildModal())
        }
        
    }
    const checkForNull = (val) => {
        return val == null ? "" : val
    }
    useEffect(() => {
        const getData = async () => {
            const data = await window.$post("pc/getForPMDetails", {id: pcForPM})
            const year = new Date(data.data.data[0].WindowsUpdateDate).getFullYear()
            const month = String(new Date(data.data.data[0].WindowsUpdateDate).getMonth() + 1).padStart(2, '0')
            const day = String(new Date(data.data.data[0].WindowsUpdateDate).getDate()).padStart(2, '0')
            let details = {
                id: pcForPM,
                internetAccess: checkForNull(data.data.data[0].InternetAccess),
                softwareInstalled: checkForNull(data.data.data[0].SoftwareInstalled),
                virusUpdate: checkForNull(data.data.data[0].VDFUDate),
                virusRemoval: checkForNull(data.data.data[0].VirusScanningRemoval),
                diskCleanup: checkForNull(data.data.data[0].DiskCleanup),
                empytRecycleBin: checkForNull(data.data.data[0].EmptyRecycleBin),
                clearTempFiles: checkForNull(data.data.data[0].ClearTemporaryInternetFiles),
                kmMouseFunctionality: checkForNull(data.data.data[0].KeyboardMouseFunctionality),
                inboxMaintenance: checkForNull(data.data.data[0].InboxMaintenance),
                spamMailRemoval: checkForNull(data.data.data[0].SpamMailRemoval),
                emailSampling: checkForNull(data.data.data[0].FiveEmailSampling),
                businessProcessRelated: checkForNull(data.data.data[0].BusinessProcessRelated),
                offense: checkForNull(data.data.data[0].Offense),
                chainEmails: checkForNull(data.data.data[0].ChainEmails),
                windowsUpdate: checkForNull(data.data.data[0].WindowsUpdateDate) === "" ? "" : `${year}-${month}-${day}`,
                pic: pic,
                remarks: checkForNull(data.data.data[0].Remarks),
            }
            setDetails(details)
        }

        getData()
    }, [])
    return (<>
        <Box sx={{width: '100%'}}>
            <Formik
                onSubmit={handleFormSubmit}
                enableReinitialize={true}
                initialValues={details}
                validationSchema={pmSchema}
            >
                {({values, errors, touched, handleBlur, handleChange, handleSubmit}) =>(
                    <form onSubmit={handleSubmit}>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={tempVal}
                                    onChange={(e) => {
                                        setApplyToAll(false)
                                        setTempVal(e.target.value)
                                    }}
                                    label="Age"
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value={"Finish"}><CircleOutlinedIcon fontSize='small'/></MenuItem>
                                    <MenuItem value={"Not Applicable"}><CloseOutlinedIcon fontSize='small'/></MenuItem>
                                    <MenuItem value={"Error/Problem"}><ChangeHistoryOutlinedIcon fontSize='small'/></MenuItem>
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox 
                                    sx={{
                                        color: colors.greenAccent[600],
                                        '&.Mui-checked': {
                                            color: colors.greenAccent[500]
                                        }
                                    }}
                                    checked={isAppliedToAll}
                                    onChange={(e) => {
                                        setApplyToAll((prev) => !prev)
                                        const newVal = {
                                            ...details,
                                            id: pcForPM,
                                            pic: pic,
                                            internetAccess: tempVal,
                                            softwareInstalled: tempVal,
                                            virusRemoval: tempVal,
                                            diskCleanup: tempVal,
                                            empytRecycleBin: tempVal,
                                            clearTempFiles: tempVal,
                                            kmMouseFunctionality: tempVal,
                                            inboxMaintenance: tempVal,
                                            spamMailRemoval: tempVal,
                                            emailSampling: tempVal,
                                            businessProcessRelated: tempVal,
                                            offense: tempVal,
                                            chainEmails: tempVal,
                                        }
                                        setDetails(newVal)
                                    }}
                                />}
                                label={"Apply to all"}
                                sx={{
                                    color: colors.grey[100]
                                }}
                            />
                        </Box>
                        <Box
                            display={"grid"}
                            gap={"20px"}
                            gridTemplateColumns={"repeat(6, minmax(0, 1fr))"}
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 2"
                                },
                                p: "0"
                            }}
                        >
                            
                            <TextField
                                fullWidth
                                variant='filled'    
                                type={"text"}
                                label={"ID"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.id}
                                name={"id"}
                                error={!!touched.id && !!errors.id}
                                helperText={touched.id && errors.id}
                                sx={{gridColumn : "span 2", display: "none"}}
                            />
                            <TextField
                                fullWidth
                                variant='filled'    
                                type={"text"}
                                label={"PIC"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.pic}
                                name={"pic"}
                                error={!!touched.pic && !!errors.pic}
                                helperText={touched.pic && errors.pic}
                                sx={{gridColumn : "span 2", display: "none"}}
                            />
                            {pmTextField(values, touched, errors).map((pmText, index) => (
                                <React.Fragment key={index}>
                                    {pmText.category.name === "textfield" ? (
                                        <TextField
                                            fullWidth
                                            variant='filled'
                                            type={pmText.name.includes("Update") ? "date": "text"}
                                            label={pmText.label}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={pmText.value}
                                            name={pmText.name}
                                            error={pmText.error}
                                            helperText={pmText.helperText}
                                            sx={{
                                                gridColumn: pmText.name.includes("Update") ? "span 2": "span 4",
                                                colorScheme: theme.palette.mode
                                            }}
                                            multiline={pmText.name.includes("Update") ? false: true}
                                            maxRows={2}
                                            required={pmText.label === "Remarks" && isRemarksRequired}
                                        />
                                    ) : (
                                        <FormControl
                                            variant='filled'
                                            sx={{
                                                gridColumn: "span 2"
                                            }}
                                        >
                                            <InputLabel>{pmText.label}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id={pmText.name}
                                                value={pmText.value}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    e.target.value === "Error/Problem" && setIsRemarksRequired(true)
                                                }}
                                                name={pmText.name}
                                                error={pmText.error}
                                            >   
                                                <MenuItem value=""></MenuItem>
                                                {pmText.category.menu.map((menu, index) => (
                                                    <MenuItem key={index} value={menu}>{menu === "Finish" ? (<CircleOutlinedIcon />)
                                                        : menu === "Not Applicable" ? (<CloseOutlinedIcon />)
                                                        : (<ChangeHistoryOutlinedIcon />)}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText sx={{color: 'red'}}>
                                                {pmText.helperText}
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </React.Fragment>
                            ))}
                        </Box>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Button
                                variant='contained'
                                type='submit'
                                sx={{
                                    background: colors.blueAccent[400],
                                    '&:hover': {
                                        color: '#ffffff',
                                        background: colors.blueAccent[400]
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    </>)
}

export default PMForm