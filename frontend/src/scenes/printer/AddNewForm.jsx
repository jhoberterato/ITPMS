import React, {useState} from 'react'
import { TextField, Box, Button, useTheme, FormControl, MenuItem, Select, InputLabel, FormHelperText } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Formik } from 'formik'
import { tokens } from '../../themes'
import { initialValues, userSchema, printerTextField } from './Data'
import style from "./style.module.css"
import { useDispatch } from 'react-redux'
import { errorDialogActions, snackBarActions, modalActions, printerActions } from '../../redux/actions'
import ErrorDialog from '../../components/ErrorDialog'

const AddNewForm = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)    
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const dispatch = useDispatch()
    const handleFormSubmit = async (values) => {
        const res = await window.$post('printer/addPrinter', values)
        if(res.data.status === "success"){
            let added = await window.$post('printer/getPrinter', {id: res.data.addedID[0].ID})
            dispatch(printerActions.addRow(added.data.data[0]))

            dispatch(modalActions.setOpenModal())
            dispatch(snackBarActions.setSnackBarMessage("Printer added successfully!"))
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
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display={"grid"} gap={"30px"} gridTemplateColumns={"repeat(6, minmax(0, 1fr))"} sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 6"},
                            p: '40px 0 30px 0',
                        }}>
                            {printerTextField(values, touched, errors).map((pcText, index) => (
                                <React.Fragment key={index}>
                                    {pcText.category.name === "textfield" ? (
                                        <TextField 
                                            fullWidth
                                            variant='filled'
                                            type={pcText.name === "pmDate" ? "date" : "text"}
                                            label={pcText.label}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={pcText.value}
                                            name={pcText.name}
                                            error={pcText.error}
                                            helperText={pcText.helperText}
                                            sx={{gridColumn : "span 3", colorScheme: theme.palette.mode}}
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

export default AddNewForm
