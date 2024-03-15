import React, {useEffect, useState} from 'react'
import { TextField, Box, Button, useTheme, FormControl, MenuItem, Select, InputLabel, FormHelperText  } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Formik } from 'formik'
import { tokens } from '../../themes'
import { editInitialVal, editValidation, editPC } from './Data'
import { printerActions, errorDialogActions, snackBarActions, modalActions} from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import style from "./style.module.css"

const EditForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const editID = useSelector((state) => state.printer.editID)

    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [details, setDetails] = useState({
        id: 0,
        pmID: 0,
        model: "",
        serialNo: "",
        area: "",
        pmDate: "",
        lastPmDate: "",
        nextPmDate: ""
    });
    const dispatch = useDispatch()
    const handleFormSubmit = async (values) => {
        const res = await window.$post("printer/updatePrinter", values)
        console.log(res)
        if(res.data.status === "success"){
            let newDetails = await window.$post('printer/getPrinter', {id: values.id})
            dispatch(printerActions.editRow(newDetails.data.data[0]))
            dispatch(modalActions.setCloseEditModal())
            dispatch(snackBarActions.setSnackBarMessage("Printer updated successfully!"))
            dispatch(snackBarActions.setOpenSnackBarForce())
        }
        else{
            dispatch(errorDialogActions.setMessage(res.data.message))
            dispatch(errorDialogActions.setIsOpen())
        }
    }
    useEffect(() => {
        const getDetails = async () => {
            const data = await window.$post("printer/getPrinter", {id: editID})
            const info = {
                id: data.data.data[0].ID,
                pmID: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].ID : 0,
                model: data.data.data[0].Model,
                serialNo: data.data.data[0].SerialNumber,
                area: data.data.data[0].Location,
                pmDate: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].PMDate === null ? "" : new Date(data.data.data[0].PMDetails[0].PMDate).toISOString().slice(0, 10) : "",
                lastPmDate: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].LastPMDate === null ? "" : new Date(data.data.data[0].PMDetails[0].LastPMDate).toISOString().slice(0, 10) : "",
                nextPmDate: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].NextPMDate === null ? "" : new Date(data.data.data[0].PMDetails[0].NextPMDate).toISOString().slice(0, 10) : "",
            }
            setDetails(info)
        }
        getDetails()
    }, [])
    return (<>
        <Box sx={{ width: '100%' }}>
            <Formik
                onSubmit={handleFormSubmit}
                enableReinitialize={true}
                initialValues={details}
                validationSchema={editValidation}
            >
                {({values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display={"grid"} gap={"30px"} gridTemplateColumns={"repeat(6, minmax(0, 1fr))"} sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 6"},
                            p: '40px 0 30px 0',
                        }}>
                            {editPC(values, touched, errors).map((pc, index) => (
                                <React.Fragment key={index}>
                                    {pc.category.name === "textfield" ? (
                                        <TextField 
                                            fullWidth
                                            variant='filled'
                                            type={pc.name.includes("Date") ? "date" : "text"}
                                            label={pc.label}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={pc.value}
                                            name={pc.name}
                                            error={pc.error}
                                            helperText={pc.helperText}
                                            sx={{gridColumn : "span 2", colorScheme: theme.palette.mode}}
                                        />
                                    ) : (
                                        <FormControl variant='filled' sx={{gridColumn: 'span 2' }}>
                                            <InputLabel>{pc.label}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id={pc.name}
                                                value={pc.value}
                                                onChange={handleChange}
                                                name={pc.name}
                                                error={pc.error}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {pc.category.menu.map((menu, index) => (
                                                    <MenuItem key={index} value={menu}>{menu}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText sx={{color: 'red'}}>{pc.helperText}</FormHelperText>
                                        </FormControl>
                                    )}
                                    
                                </React.Fragment>
                            ))}
                        </Box>
                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <Button variant="contained" type='submit' 
                                sx={{
                                    background: colors.blueAccent[400],
                                    '&:hover': {
                                        color: '#ffffff',
                                        background: colors.blueAccent[400]
                                    },
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

export default EditForm