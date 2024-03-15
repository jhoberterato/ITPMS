import React, {useState} from 'react'
import { TextField, Box, Button, useTheme, Stepper, Step, StepLabel, Typography, FormControl, MenuItem, Select, InputLabel, FormHelperText  } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Formik } from 'formik'
import { tokens } from '../../themes'
import { initialValues, phoneRegExp, userSchema, userTextField, pcTextField, returnStep } from './Data'
import { useDispatch } from 'react-redux'
import { modalActions, snackBarActions, errorDialogActions, pcActions } from '../../redux/actions'
import ErrorDialog from '../../components/ErrorDialog'
import style from "./style.module.css"

const AddNewForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const steps = ['PC/Laptop Details', "User's Information"]
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set())
    const dispatch = useDispatch()
    const isStepSkipped = (step) => {
        return skipped.has(step)
    }
    const handleNext = () => {
        let newSkipped = skipped
        if(isStepSkipped(activeStep)){
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }
        setActiveStep((preActiveStep) => preActiveStep + 1)
    }
    const handleBack = () => {
        setActiveStep((prev) => prev - 1)
    }
    const handleReset = () => {
        setActiveStep(0);
    }

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = async (values) => {
        const res = await window.$post('pc/addPC', values)
        if(res.data.status === 'success'){
            let added = await window.$post('pc/getPC', {id: res.data.addedID[0].ID})
            dispatch(pcActions.addRow(added.data.data[0]))
            dispatch(modalActions.setOpenModal())
            dispatch(snackBarActions.setSnackBarMessage("PC/Laptop added successfully!"))
            dispatch(snackBarActions.setOpenSnackBarForce())
        }
        else{
            dispatch(errorDialogActions.setMessage(res.data.message))
            dispatch(errorDialogActions.setIsOpen())
        }
    }
    return (<>
        <Box sx={{ width: '100%' }}>
            <ErrorDialog />
            <Box m={"20px"}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                >
                    {({values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Stepper activeStep={activeStep} 
                                sx={{
                                    '& .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-1k4m3bz-MuiStepLabel-label.Mui-active, & .css-1odpicj-MuiStepLabel-label.Mui-active': {
                                        color: colors.blueAccent[300]
                                    },
                                    '& .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1odpicj-MuiStepLabel-label.Mui-completed, & .css-1k4m3bz-MuiStepLabel-label.Mui-completed': {
                                        color: colors.greenAccent[600]
                                    },
                                    '& .css-6p3oph-MuiTypography-root': {
                                        color: colors.primary[200]
                                    },
                                    '& .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root, & .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root, & .css-1k4m3bz-MuiStepLabel-label, & .css-1odpicj-MuiStepLabel-label': {
                                        color: `${colors.blueAccent[600]}!important`
                                    },
                                    '& .css-z7uhs0-MuiStepConnector-line, & .css-g7zrp6-MuiStepConnector-line': {
                                        borderColor: colors.blueAccent[400]
                                    },
                                }}
                            >
                                {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                // if (isStepOptional(index)) {
                                //     labelProps.optional = (
                                //     <Typography variant="caption">Optional</Typography>
                                //     );
                                // }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                                })}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}
                                            sx={{
                                                background: colors.blueAccent[400],
                                                color: '#ffffff',
                                                '&:hover': {
                                                    color: '#ffffff',
                                                    background: colors.blueAccent[400]
                                                }
                                            }}
                                        >Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Box display={"grid"} gap={"30px"} gridTemplateColumns={"repeat(6, minmax(0, 1fr))"} sx={{
                                        "& > div": {gridColumn: isNonMobile ? undefined : "span 6"},
                                        p: '40px 0 30px 0',
                                    }}>
                                        {activeStep === 0 ? pcTextField(values, touched, errors).map((pcText, index) => (
                                            <React.Fragment key={index}>
                                                {pcText.category.name === "textfield" ? (
                                                    <TextField 
                                                        fullWidth
                                                        variant='filled'
                                                        type={pcText.name.includes("Date") ? "date" : "text"}
                                                        label={pcText.label}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={pcText.value}
                                                        name={pcText.name}
                                                        error={pcText.error}
                                                        helperText={pcText.helperText}
                                                        sx={{gridColumn : pcText.name === "pmDate" ? "span 3" : "span 2", colorScheme: theme.palette.mode}}
                                                    />
                                                ) : (
                                                    <FormControl variant='filled' sx={{gridColumn: 'span 3' }}>
                                                        <InputLabel>{pcText.label}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id={pcText.name}
                                                            value={pcText.value}
                                                            onChange={handleChange}
                                                            name={pcText.name}
                                                            error={pcText.error}
                                                        >
                                                            <MenuItem value=""></MenuItem>
                                                            {pcText.category.menu.map((menu, index) => (
                                                                <MenuItem key={index} value={menu}>{menu}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        <FormHelperText sx={{color: 'red'}}>{pcText.helperText}</FormHelperText>
                                                    </FormControl>
                                                )}
                                                
                                            </React.Fragment>
                                        )) : userTextField(values, touched, errors).map((userText, index) => (
                                            <React.Fragment key={index}>
                                                {userText.category.name === "textfield" ? (
                                                    <TextField 
                                                        fullWidth
                                                        variant='filled'
                                                        type='text'
                                                        label={userText.label}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={userText.value}
                                                        name={userText.name}
                                                        error={userText.error}
                                                        helperText={userText.helperText}
                                                        sx={{gridColumn : "span 2"}}
                                                    />
                                                ) : (
                                                    <FormControl variant='filled' sx={{gridColumn: 'span 3' }}>
                                                        <InputLabel>{userText.label}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id={userText.name}
                                                            value={userText.value}
                                                            onChange={handleChange}
                                                            name={userText.name}
                                                            error={userText.error}
                                                        >
                                                            <MenuItem value=""></MenuItem>
                                                            {userText.category.menu.map((menu, index) => (
                                                                <MenuItem key={index} value={menu}>{menu}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        <FormHelperText sx={{color: 'red'}}>{userText.helperText}</FormHelperText>
                                                    </FormControl>
                                                )}
                                                
                                            </React.Fragment>

                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button variant="contained"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{
                                                mr: 1,
                                                background: colors.blueAccent[400],
                                                '&:hover': {
                                                    color: '#ffffff',
                                                    background: colors.blueAccent[400]
                                                }
                                            }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />

                                        <Button variant="contained" onClick={handleNext}
                                            sx={{
                                                background: colors.blueAccent[400],
                                                '&:hover': {
                                                    color: '#ffffff',
                                                    background: colors.blueAccent[400]
                                                },
                                                display: activeStep === steps.length - 1 ? 'none' : undefined
                                            }}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        <Button variant="contained" type='submit' onClick={() => {
                                            if(Object.keys(values).find((key) => values[key] === "") != undefined){
                                                let newStep = returnStep(Object.keys(values).find((key) => values[key] === ""))
                                                newStep === 1 ? setActiveStep((prev) => prev - 1) : undefined
                                            }
                                        }}
                                            sx={{
                                                background: colors.blueAccent[400],
                                                '&:hover': {
                                                    color: '#ffffff',
                                                    background: colors.blueAccent[400]
                                                },
                                                display: activeStep === steps.length - 1 ? undefined : 'none'
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    </>)
}

export default AddNewForm
