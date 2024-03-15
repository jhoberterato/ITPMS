import React, { useEffect, useState } from 'react'
import { TextField, Box, Button, useTheme, FormControl, MenuItem, Select, InputLabel, FormHelperText, FormControlLabel, Checkbox, Snackbar, Slide} from '@mui/material'
import { brotherSchema, epsonSchema, brotherTextField, epsonTextField } from './Data1'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import  useMediaQuery  from '@mui/material/useMediaQuery'
import { Formik } from 'formik'
import { tokens } from '../../../themes'
import { useDispatch, useSelector } from 'react-redux';
import { openChildModalActions, snackBarActions, errorDialogActions } from '../../../redux/actions';

const PMForm = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const colors = tokens(theme.palette.mode)    
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [tempVal, setTempVal] = useState("")
    const[isAppliedToAll, setApplyToAll] = useState(false)
    const printerForPM = useSelector((state) => state.calendar.printerPMIDForPM)
    const printerID = useSelector(state => state.calendar.printerIDForPM)
    const model = useSelector(state => state.calendar.printerModelForPM)
    const user = useSelector(state => state.user.userInfo)
    const pic = `${user.FirstName[0].toLowerCase()}${user.LastName.toLowerCase()}`
    const [details, setDetails] = useState(model.toLowerCase().includes("brother") ? {
        id: printerForPM,
        cover: "",
        coverAction: "",
        rollerNotLoose: "",
        rollerNotLooseAction: "",
        rollerClean: "",
        rollerCleanAction: "",
        cuttersSharp: "",
        cuttersSharpAction: "",
        cuttersClean: "",
        cuttersCleanAction: "",
        feedButton: "",
        feedButtonAction: "",
        cutButton: "",
        cutButtonAction: "",
        labelOutlet: "",
        labelOutletAction: "",
        pic: pic,
        remarks: "",
    } : {
        id: printerForPM,
        cover: "",
        coverAction: "",
        ribbonWinding: "",
        ribbonWindingAction: "",
        headerLockLever: "",
        headerLockLeverAction: "",
        thermalHeader: "",
        thermalHeaderAction: "",
        rollerClean: "",
        rollerCleanAction: "",
        pitch: "",
        pitchAction: "",
        offset: "",
        offsetAction: "",
        darkness: "",
        darknessAction: "",
        speed: "",
        speedAction: "",
        pic: pic,
        remarks: "",
    })
    const handleFormSubmit = async (values) => {
        const data = await window.$post("printer/submitPM", {model: model, values: values, printerID: printerID})
        console.log(data)
        if(data.data.status === "success"){
            dispatch(openChildModalActions.setOpenChildModal())
            dispatch(snackBarActions.setSnackBarMessage("PM submitted successfully!"))
            dispatch(snackBarActions.setOpenSnackBarForce())
        }
        else{
            dispatch(errorDialogActions.setMessage(data.data.message))
            dispatch(errorDialogActions.setIsOpen())
        }       
    }

    const checkForNull = (val) => {
        return val == null ? "" : val
    }
    useEffect(() => {
        const getData = async () => {
            const data = await window.$post("printer/getForPMDetails", {id: printerForPM})
            let detailsTemp = model.toLowerCase().includes("brother") ? {
                id: printerForPM,
                cover: checkForNull(data.data.data[0].Cover),
                coverAction: checkForNull(data.data.data[0].CoverAction),
                rollerNotLoose: checkForNull(data.data.data[0].RollerNotLoose),
                rollerNotLooseAction: checkForNull(data.data.data[0].RollerNotLooseAction),
                rollerClean: checkForNull(data.data.data[0].RollerClean),
                rollerCleanAction: checkForNull(data.data.data[0].RollerClean.Action),
                cuttersSharp: checkForNull(data.data.data[0].CuttersSharp),
                cuttersSharpAction: checkForNull(data.data.data[0].CuttersSharp.Action),
                cuttersClean: checkForNull(data.data.data[0].CutterClean),
                cuttersCleanAction: checkForNull(data.data.data[0].CutterClean.Action),
                feedButton: checkForNull(data.data.data[0].FeedButton),
                feedButtonAction: checkForNull(data.data.data[0].FeedButton.Action),
                cutButton: checkForNull(data.data.data[0].CutButton),
                cutButtonAction: checkForNull(data.data.data[0].CutButton.Action),
                labelOutlet: checkForNull(data.data.data[0].LabelOutlet),
                labelOutletAction: checkForNull(data.data.data[0].LabelOutlet.Action),
                pic: pic,
                remarks: checkForNull(data.data.data[0].Remarks),
            } : {
                id: printerForPM,
                cover: checkForNull(data.data.data[0].Cover),
                coverAction: checkForNull(data.data.data[0].CoverAction),
                ribbonWinding: checkForNull(data.data.data[0].RibbonWinding),
                ribbonWindingAction: checkForNull(data.data.data[0].RibbonWindingAction),
                headerLockLever: checkForNull(data.data.data[0].HeaderLockLever),
                headerLockLeverAction: checkForNull(data.data.data[0].HeaderLockLevelAction),
                thermalHeader: checkForNull(data.data.data[0].ThermalHeader),
                thermalHeaderAction: checkForNull(data.data.data[0].ThermalHeaderAction),
                rollerClean: checkForNull(data.data.data[0].RollerClean),
                rollerCleanAction: checkForNull(data.data.data[0].RollerCleanAction),
                pitch: checkForNull(data.data.data[0].Pitch),
                pitchAction: checkForNull(data.data.data[0].PitchAction),
                offset: checkForNull(data.data.data[0].Offset),
                offsetAction: checkForNull(data.data.data[0].OffsetAction),
                darkness: checkForNull(data.data.data[0].Darkness),
                darknessAction: checkForNull(data.data.data[0].DarknessAction),
                speed: checkForNull(data.data.data[0].Speed),
                speedAction: checkForNull(data.data.data[0].SpeedAction),
                pic: pic,
                remarks: checkForNull(data.data.data[0].Remarks),
            }
            setDetails(detailsTemp)
        }
        getData()
    }, [])
    return (<>
        <Box sx={{width: '100%'}}>
            <Formik
                onSubmit={handleFormSubmit}
                enableReinitialize={true}
                initialValues={details}
                validationSchema={model.toLowerCase().includes("brother") ? brotherSchema : epsonSchema}
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
                                        setTempVal(e.target.value)
                                        setApplyToAll(false)
                                    }}
                                    label="Age"
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value={"No Problem"}><CircleOutlinedIcon fontSize='small'/></MenuItem>
                                    <MenuItem value={"Needs Repair/Replacement"}><CloseOutlinedIcon fontSize='small'/></MenuItem>
                                    <MenuItem value={"Needs Adjustment"}><ChangeHistoryOutlinedIcon fontSize='small'/></MenuItem>
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
                                        setApplyToAll(prev => !prev)
                                        const newVal = model.toLowerCase().includes("brother") ? {
                                            ...details,
                                            id: printerForPM,
                                            cover: tempVal,
                                            rollerNotLoose: tempVal,
                                            rollerClean: tempVal,
                                            cuttersSharp: tempVal,
                                            cuttersClean: tempVal,
                                            feedButton: tempVal,
                                            cutButton: tempVal,
                                            labelOutlet: tempVal,
                                            pic: pic,
                                        } : {
                                            ...details,
                                            id: printerForPM,
                                            cover: tempVal,
                                            ribbonWinding: tempVal,
                                            headerLockLever: tempVal,
                                            thermalHeader: tempVal,
                                            rollerClean: tempVal,
                                            pitch: tempVal,
                                            offset: tempVal,
                                            darkness: tempVal,
                                            speed: tempVal,
                                            pic: pic,
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
                            gridTemplateColumns={"repeat(8, minmax(0, 1fr))"}
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
                            {model.toLowerCase().includes("brother") ? brotherTextField(values, touched, errors).map((pmText, index) => (
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
                                                gridColumn: pmText.name === "remarks" ? "span 8" : "span 2",
                                                colorScheme: theme.palette.mode
                                            }}
                                            multiline={pmText.name.includes("Update") ? false: true}
                                            maxRows={pmText.name === "remarks" ? 2 : 1}
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
                                                onChange={handleChange}
                                                name={pmText.name}
                                                error={pmText.error}
                                            >   
                                                <MenuItem value=""></MenuItem>
                                                {pmText.category.menu.map((menu, index) => (
                                                    <MenuItem key={index} value={menu}>{menu === "No Problem" ? (<CircleOutlinedIcon />)
                                                        : menu === "Needs Repair/Replacement" ? (<CloseOutlinedIcon />)
                                                        : (<ChangeHistoryOutlinedIcon />)}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText sx={{color: 'red'}}>
                                                {pmText.helperText}
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                </React.Fragment>
                            )) : epsonTextField(values, touched, errors).map((pmText, index) => (
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
                                                gridColumn: pmText.name === "remarks" ? "span 4" : "span 2",
                                                colorScheme: theme.palette.mode
                                            }}
                                            multiline={pmText.name.includes("Update") ? false: true}
                                            maxRows={pmText.name === "remarks" ? 2 : 1}
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
                                                onChange={handleChange}
                                                name={pmText.name}
                                                error={pmText.error}
                                            >   
                                                <MenuItem value=""></MenuItem>
                                                {pmText.category.menu.map((menu, index) => (
                                                    <MenuItem key={index} value={menu}>{menu === "No Problem" ? (<CircleOutlinedIcon />)
                                                        : menu === "Needs Repair/Replacement" ? (<CloseOutlinedIcon />)
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
                                    mt: 1,
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