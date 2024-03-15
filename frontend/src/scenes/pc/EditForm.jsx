import React, { useEffect, useState } from "react";
import { TextField, Box, Button, useTheme, Stepper, Step, StepLabel, Typography, FormControl, MenuItem, Select, InputLabel, FormHelperText, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { tokens } from "../../themes";
import { editInitialVal, editValidation, editUser, editPC, editPM, returnEditStep } from "./Data";
import { useSelector, useDispatch } from "react-redux";
import { snackBarActions, errorDialogActions, modalActions, pcActions } from "../../redux/actions";
import ErrorDialog from "../../components/ErrorDialog";
import style from "./style.module.css";

const EditForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const steps = ["PC/Laptop Details", "User's Information", "PM Schedules"];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const openEditModal = useSelector((state) => state.modal.openEditModal);
  const [details, setDetails] = useState({
    id: 0,
    pmID: 0,
    ipAddress: '',
    model: '',
    serialNo: '',
    name: '',
    type: '',
    warrantyDate: '',
    os: '',
    osKey: '',
    maker: '',
    macAddress: '',
    user: '',
    userIDNo: '',
    email: '',
    area: '',
    department: '',
    pmDate: '',
    lastPmDate: '',
    nextPmDate: '',
  });
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((preActiveStep) => preActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch()

  const handleFormSubmit = async (values) => {
    console.log(values)
    const res = await window.$post('pc/updatePC', values)
    if(res.data.status === 'success'){
      let newDetails = await window.$post('pc/getPC', {id: values.id})
      console.log(newDetails)
      dispatch(pcActions.editRow(newDetails.data.data[0]))
      dispatch(modalActions.setCloseEditModal())
      dispatch(snackBarActions.setSnackBarMessage("PC/Laptop updated successfully!"))
      dispatch(snackBarActions.setOpenSnackBarForce())
    }
    else{
      dispatch(errorDialogActions.setMessage(res.data.message))
      dispatch(errorDialogActions.setIsOpen())
    }
  };
  const pcID = useSelector(state => state.pc.editID)
  useEffect(() => {
    const getDetails = async () => {
      const data = await window.$post("pc/getPC", { id: pcID });
      const info = {
        id: data.data.data[0].ID,
        pmID: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].ID : 0,
        ipAddress: data.data.data[0].IPAddress,
        model: data.data.data[0].Model,
        serialNo: data.data.data[0].ModelSN,
        name: data.data.data[0].PCName,
        type: data.data.data[0].Type,
        warrantyDate: new Date(data.data.data[0].WarrantyDate).toISOString().slice(0, 10),
        os: data.data.data[0].OS,
        osKey: data.data.data[0].OSKey,
        maker: data.data.data[0].Maker,
        macAddress: data.data.data[0].macAddress,
        user: data.data.data[0].Name,
        userIDNo: data.data.data[0].EmpID,
        email: data.data.data[0].Email,
        area: data.data.data[0].Location,
        department: data.data.data[0].Department,
        pmDate: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].PMDate === null ? "" : new Date(data.data.data[0].PMDetails[0].PMDate).toISOString().slice(0, 10) : "",
        lastPmDate: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].LastPMDate === null ? "" : new Date(data.data.data[0].PMDetails[0].LastPMDate).toISOString().slice(0, 10) : "",
        nextPmDate: data.data.data[0].PMDetails.length > 0 ? data.data.data[0].PMDetails[0].NextPMDate === null ? "" : new Date(data.data.data[0].PMDetails[0].NextPMDate).toISOString().slice(0, 10) : "",
      };
      setDetails(info);

    };

    getDetails();
  }, []);
 
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box m={"20px"}>
          <ErrorDialog />
          <Formik
            onSubmit={handleFormSubmit}
            enableReinitialize={true}
            initialValues={details === null || undefined ? editInitialVal : details}
            validationSchema={editValidation}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stepper
                  activeStep={activeStep}
                  sx={{
                    "& .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, & .css-1k4m3bz-MuiStepLabel-label.Mui-active, & .css-1odpicj-MuiStepLabel-label.Mui-active":
                      {
                        color: colors.blueAccent[300],
                      },
                    "& .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed, & .css-1odpicj-MuiStepLabel-label.Mui-completed, & .css-1k4m3bz-MuiStepLabel-label.Mui-completed":
                      {
                        color: colors.greenAccent[600],
                      },
                    "& .css-6p3oph-MuiTypography-root": {
                      color: colors.primary[200],
                    },
                    "& .css-1uizxs6-MuiSvgIcon-root-MuiStepIcon-root, & .css-oxf95d-MuiSvgIcon-root-MuiStepIcon-root, & .css-1k4m3bz-MuiStepLabel-label, & .css-1odpicj-MuiStepLabel-label":
                      {
                        color: `${colors.blueAccent[600]}!important`,
                      },
                    "& .css-z7uhs0-MuiStepConnector-line, & .css-g7zrp6-MuiStepConnector-line":
                      {
                        borderColor: colors.blueAccent[400],
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
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        onClick={handleReset}
                        sx={{
                          background: colors.blueAccent[400],
                          color: "#ffffff",
                          "&:hover": {
                            color: "#ffffff",
                            background: colors.blueAccent[400],
                          },
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box
                      display={"grid"}
                      gap={"30px"}
                      gridTemplateColumns={"repeat(6, minmax(0, 1fr))"}
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 6",
                        },
                        p: "40px 0 30px 0",
                      }}
                    >
                      {activeStep === 0
                        ? editPC(values, touched, errors).map((pc, index) => (
                            <React.Fragment key={index}>
                              {pc.category.name === "textfield" ? (
                                <TextField
                                  fullWidth
                                  variant="filled"
                                  type={
                                    pc.name.includes("Date") ? "date" : "text"
                                  }
                                  label={pc.label}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={pc.value}
                                  name={pc.name}
                                  error={pc.error}
                                  helperText={pc.helperText}
                                  sx={{
                                    gridColumn: "span 2",
                                    colorScheme: theme.palette.mode,
                                  }}
                                />
                              ) : (
                                <FormControl
                                  variant="filled"
                                  sx={{ gridColumn: "span 6" }}
                                >
                                  <InputLabel>{pc.label}</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-filled-label"
                                    id={pc.name}
                                    value={pc.value}
                                    onChange={handleChange}
                                    name={pc.name}
                                    error={pc.error}
                                  >
                                    <MenuItem value={""}></MenuItem>
                                    {pc.category.menu.map((menu, index) => (
                                      <MenuItem key={index} value={menu}>
                                        {menu}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  <FormHelperText sx={{ color: "red" }}>
                                    {pc.helperText}
                                  </FormHelperText>
                                </FormControl>
                              )}
                            </React.Fragment>
                          ))
                        : activeStep === 1
                        ? editUser(values, touched, errors).map(
                            (user, index) => (
                              <React.Fragment key={index}>
                                {user.category.name === "textfield" ? (
                                  <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label={user.label}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={user.value}
                                    name={user.name}
                                    error={user.error}
                                    helperText={user.helperText}
                                    sx={{ gridColumn: "span 2" }}
                                  />
                                ) : (
                                  <FormControl
                                    variant="filled"
                                    sx={{ gridColumn: "span 3" }}
                                  >
                                    <InputLabel>{user.label}</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-filled-label"
                                      id={user.name}
                                      value={user.value}
                                      onChange={handleChange}
                                      name={user.name}
                                      error={user.error}
                                    >
                                      <MenuItem value=""></MenuItem>
                                      {user.category.menu.map((menu, index) => (
                                        <MenuItem key={index} value={menu}>
                                          {menu}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    <FormHelperText sx={{ color: "red" }}>
                                      {user.helperText}
                                    </FormHelperText>
                                  </FormControl>
                                )}
                              </React.Fragment>
                            )
                          )
                        : editPM(values, touched, errors).map((pm, index) => (
                            <React.Fragment key={index}>
                              <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label={pm.label}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={pm.value}
                                name={pm.name}
                                error={pm.error}
                                helperText={pm.helperText}
                                sx={{ gridColumn: "span 2" }}
                              />
                            </React.Fragment>
                          ))}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                          mr: 1,
                          background: colors.blueAccent[400],
                          "&:hover": {
                            color: "#ffffff",
                            background: colors.blueAccent[400],
                          },
                        }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          background: colors.blueAccent[400],
                          "&:hover": {
                            color: "#ffffff",
                            background: colors.blueAccent[400],
                          },
                          display:
                            activeStep === steps.length - 1
                              ? "none"
                              : undefined,
                        }}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={() => {
                          if (
                            Object.keys(values).find(
                              (key) => values[key] == ""
                            ) != undefined
                          ) {
                            let newStep = returnEditStep(
                              Object.keys(values).find(
                                (key) => values[key] == ""
                              )
                            );
                            if(newStep === 1){
                              setActiveStep((prev) => prev - 1)
                            }
                            else if(newStep === 2){
                              setActiveStep((prev) => prev - 2)
                            }
                            else{
                              setActiveStep(2)
                            }
                          }
                        }}
                        sx={{
                          background: colors.blueAccent[400],
                          "&:hover": {
                            color: "#ffffff",
                            background: colors.blueAccent[400],
                          },
                          display:
                            activeStep === steps.length - 1
                              ? undefined
                              : "none",
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
    </>
  );
};

export default EditForm;
