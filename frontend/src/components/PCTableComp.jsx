// import React, { useEffect, useState } from 'react'
// import PropTypes from "prop-types"
// import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, Typography, Paper, useTheme, Button, Stepper, Step, StepLabel, TextField, useMediaQuery } from '@mui/material'
// import { tokens } from '../themes';
// import { styled } from '@mui/material/styles';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import Header from '../components/Header';
// import ModalComp from './ModalComp';
// import { Formik } from 'formik';
// import * as yup from 'yup'

// function createData(name, calories, fat, carbs, protein, price) {
//     return {
//       name,
//       calories,
//       fat,
//       carbs,
//       protein,
//       price,
//       history: [
//         {
//           date: '2020-01-05',
//           customerId: '11091700',
//           amount: 3,
//         },
//         {
//           date: '2020-01-02',
//           customerId: 'Anonymous',
//           amount: 1,
//         },
//       ],
//     };
// }
  
// function Row(props) {
//     const { row } = props;
//     const [open, setOpen] = React.useState(false);
//     const theme = useTheme()
//     const colors = tokens(theme.palette.mode)
//     const CustButton = styled(Button)({
//         '&:hover': {
//             background: colors.blueAccent[600]
//         }
//     })
//     return (
//         <React.Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' }, background: colors.primary[400] }}>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     {row.name}
//                 </TableCell>
//                 <TableCell align="center">{row.calories}</TableCell>
//                 <TableCell align="center">{row.fat}</TableCell>
//                 <TableCell align="center">{row.carbs}</TableCell>
//                 <TableCell align="center">{row.protein}</TableCell>
//                 <TableCell align="center">
//                     <CustButton variant={"contained"}
//                         onClick={() => console.log("test")}
//                         startIcon={<EditOutlinedIcon />} 
//                         sx={{ background: colors.blueAccent[700], color: colors.grey[100]}}
//                     >Edit</CustButton>
//                 </TableCell>
//             </TableRow>
//             <TableRow sx={{background: colors.primary[400]}}>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {row.history.map((historyRow) => (
//                                         <TableRow key={historyRow.date}>
//                                             <TableCell component="th" scope="row">
//                                                 {historyRow.date}
//                                             </TableCell>
//                                             <TableCell>{historyRow.customerId}</TableCell>
//                                             <TableCell align="right">{historyRow.amount}</TableCell>
//                                             <TableCell align="right">
//                                                 {Math.round(historyRow.amount * row.price * 100) / 100}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }
  
// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };
  
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createData('Gingerbread1', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread2', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread3', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread4', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread5', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread6', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread7', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread8', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread9', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread10', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread11', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread12', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread13', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread14', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread15', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread16', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread17', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread18', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread19', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread20', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread21', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread22', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread23', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread24', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread25', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread26', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread27', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread28', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread29', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread30', 356, 16.0, 49, 3.9, 1.5),
//     createData('Gingerbread31', 356, 16.0, 49, 3.9, 1.5),
// ];
// const PCTableComp = () => {
//     const theme = useTheme()
//     const colors = tokens(theme.palette.mode)
//     const [page, setPage] = useState(0)
//     const [rowsPerPage, setRowsPerPage] = useState(10)

//     const handleChangePage = (e, newPage) => {
//         setPage(newPage)
//     }
//     const handleChangeRowsPage = (e) => {
//         setRowsPerPage(+ e.target.value)
//         setPage(0)
//     }
//     return (<>
//         <Box m={"20px"}>
//             <Header title={"PC/Laptop"} subtitle={"List of PC/Laptop"} />
//             <ModalComp buttonOpenName={"ADD"} widthProps={'50%'} heightProps={'50%'}>{addNewPC}</ModalComp>
//             <TableContainer component={Paper}>
//                 <Table aria-label="collapsible table">
//                     <TableHead sx={{background: colors.blueAccent[700]}}>
//                         <TableRow>
//                         <TableCell />
//                         <TableCell>Dessert (100g serving)</TableCell>
//                         <TableCell align="center">Calories</TableCell>
//                         <TableCell align="center">Fat&nbsp;(g)</TableCell>
//                         <TableCell align="center">Carbs&nbsp;(g)</TableCell>
//                         <TableCell align="center">Protein&nbsp;(g)</TableCell>
//                         <TableCell align="center">Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//                         <Row key={row.name} row={row} />
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
//                 component={"div"}
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPage}
//             />
//         </Box>
//     </>)
// }

// export default PCTableComp

// /*----------Add New PC/Laptop-----------*/
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// const userSchema = yup.object().shape({
//   firstName: yup.string().required("First Name is Required"),
//   lastName: yup.string().email("Invalid email").required("Last Name is Required"),
//   email: yup.string().required("Email is Required"),
//   contact: yup.string().matches(phoneRegExp, "Kindly input valid contact").required("Contact is Required"),
//   address1: yup.string().required("Present Address is Required"),
//   address2: yup.string().required("Home Address is Required"),
// })

// const addNewPC = () => {
//     const theme = useTheme()
//     const colors = tokens(theme.palette.mode)
//     const steps = ['1', '2', '3']
//     const [activeStep, setActiveStep] = useState(0)
//     const [skipped, setSkipped] = useState(new Set())
//     const isStepOptional = (step) => {
//         return step === 1
//     }
//     const isStepSkipped = (step) => {
//         return skipped.has(step)
//     }
//     const handleNext = () => {
//         let newSkipped = skipped
//         if(isStepSkipped(activeStep)){
//             newSkipped = new Set(newSkipped.values())
//             newSkipped.delete(activeStep)
//         }
//         console.log(newSkipped)
//         setActiveStep((preActiveStep) => preActiveStep + 1)
//         setSkipped(newSkipped)
//     }
//     const handleBack = () => {
//         setActiveStep((prev) => prev - 1)
//     }
//     const handleSkip = () => {
//         if(!isStepOptional(activeStep)){
//             throw new Error("You can't skip a step that isn't optional.")
//         }

//         setActiveStep((prev) => prev + 1)
//         setSkipped((prev) => {
//             const newSkipped = new Set(prev.values())
//             newSkipped.add(activeStep)
//             return newSkipped
//         })
//     }
//     const handleReset = () => {
//         setActiveStep(0);
//     }

    
//     return(<>
//         <Box sx={{ width: '100%' }}>
//             <Stepper activeStep={activeStep} 
//                 sx={{
//                     '& .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-1k4m3bz-MuiStepLabel-label.Mui-active, & .css-1odpicj-MuiStepLabel-label.Mui-active': {
//                         color: colors.blueAccent[300]
//                     },
//                     '& .css-6p3oph-MuiTypography-root': {
//                         color: colors.blueAccent[200]
//                     },
//                     '& .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1odpicj-MuiStepLabel-label.Mui-completed, & .css-1k4m3bz-MuiStepLabel-label.Mui-completed': {
//                         color: colors.greenAccent[600]
//                     },
//                     '& .css-6p3oph-MuiTypography-root': {
//                         color: colors.primary[200]
//                     },
//                     '& .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root, & .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root, & .css-1k4m3bz-MuiStepLabel-label, & .css-1odpicj-MuiStepLabel-label': {
//                         color: `${colors.blueAccent[600]}!important`
//                     },
//                     '& .css-z7uhs0-MuiStepConnector-line, & .css-g7zrp6-MuiStepConnector-line': {
//                         borderColor: colors.blueAccent[400]
//                     },
//                 }}
//             >
//                 {steps.map((label, index) => {
//                 const stepProps = {};
//                 const labelProps = {};
//                 if (isStepOptional(index)) {
//                     labelProps.optional = (
//                     <Typography variant="caption">Optional</Typography>
//                     );
//                 }
//                 if (isStepSkipped(index)) {
//                     stepProps.completed = false;
//                 }
//                 return (
//                     <Step key={label} {...stepProps}>
//                     <StepLabel {...labelProps}>{label}</StepLabel>
//                     </Step>
//                 );
//                 })}
//             </Stepper>
//             {activeStep === steps.length ? (
//                 <React.Fragment>
//                 <Typography sx={{ mt: 2, mb: 1 }}>
//                     All steps completed - you&apos;re finished
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                     <Box sx={{ flex: '1 1 auto' }} />
//                     <Button onClick={handleReset}
//                         sx={{
//                             background: colors.blueAccent[400],
//                             color: '#ffffff',
//                             '&:hover': {
//                                 color: '#ffffff',
//                                 background: colors.blueAccent[400]
//                             }
//                         }}
//                     >Reset</Button>
//                 </Box>
//                 </React.Fragment>
//             ) : (
//                 <React.Fragment>
//                 <Formik>

//                 </Formik>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                     <Button variant="contained"
//                         disabled={activeStep === 0}
//                         onClick={handleBack}
//                         sx={{
//                             mr: 1,
//                             background: colors.blueAccent[400],
//                             '&:hover': {
//                                 color: '#ffffff',
//                                 background: colors.blueAccent[400]
//                             }
//                         }}
//                     >
//                         Back
//                     </Button>
//                     <Box sx={{ flex: '1 1 auto' }} />
//                     {isStepOptional(activeStep) && (
//                     <Button variant="contained" onClick={handleSkip} 
//                         sx={{
//                             mr: 1,
//                             background: colors.blueAccent[400],
//                             '&:hover': {
//                                 color: '#ffffff',
//                                 background: colors.blueAccent[400]
//                             }
//                         }}
//                     >
//                         Skip
//                     </Button>
//                     )}

//                     <Button variant="contained" onClick={handleNext} 
//                         sx={{
//                             background: colors.blueAccent[400],
//                             '&:hover': {
//                                 color: '#ffffff',
//                                 background: colors.blueAccent[400]
//                             }
//                         }}
//                     >
//                         {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                     </Button>
//                 </Box>
//                 </React.Fragment>
//             )}
//         </Box>
//     </>)
// }