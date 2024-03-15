import TopBar from "../global/TopBar"
import SideBar from "../global/SideBar";
import Dashboard from "../dashboard/index";
import Contacts from "../contacts/Contacts";
import Invoices from "../invoices/Invoices";
import Form from "../form/Form";
import Calendar from "../calendar/Index";
import FAQ from "../faq/FAQ";
import Bar from "../bar/Bar";
import Pie from "../pie/Pie";
import Line from "../line/Line";
import Geography from "../geography/Geography";
import LabelComp from "../../components/LabelComp";
import Login from "../login/Login";
import PC from "../pc/Index"
import Printer from "../printer/Index"
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, snackBarActions } from "../../redux/actions";
import { Snackbar, Alert, useTheme } from "@mui/material";
import { tokens } from "../../themes";

const MainPage = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate()
    const r = [
      {path : "/home", element: <Dashboard />},
      {path : "/print", element: <LabelComp />},
      {path : "/pc", element: <PC />},
      {path : "/printer", element: <Printer />},
      {path : "/contacts", element: <Contacts />},
      {path : "/invoices", element: <Invoices />},
      {path : "/calendar/:cat", element: <Calendar />},
      {path : "/faq", element: <FAQ />},
      {path : "/form", element: <Form />},
      {path : "/bar", element: <Bar />},
      {path : "/pie", element: <Pie />},
      {path : "/line", element: <Line />},
      {path : "/geography", element: <Geography />},
    ]
    const snackBar = useSelector((state) => state.snackBar.openSnackBar)
    const snackBarMessage = useSelector((state) => state.snackBar.snackBarMessage)
    const dispatch = useDispatch()
    const handleCloseSnackBar = (e, reason) => {
      if(reason === 'clickaway'){
        return
      }
      dispatch(snackBarActions.setOpenSnackBar())
    }
    
    useEffect(() => {
      
      const getUser = async () => {
        const decUser = await window.$post('decUser', {token: window.sessionStorage.getItem('userToken')})
        dispatch(userActions.setUserInfo(decUser.data))
      }

      if(!window.sessionStorage.getItem("isLogin")){
        navigate("/")
      }else{

        getUser()

      }

    }, [])
    return (<>
      <div className="app">
        <SideBar />
        <main className="content">
          <TopBar />
          <Routes>
            <Route path="/" element={<Login />} />
            {r.map((_route, index) => (
              (<Route key={index} path={_route.path} element={
                _route.element
              } />)
            ))}
          </Routes>
          <Snackbar 
            open={snackBarMessage === "" ? false : snackBar}
            autoHideDuration={5000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            onClose={handleCloseSnackBar}
          >
            <Alert
              severity="success"
              icon={false}
              variant="filled"
              sx={{ width: '100%', background: colors.greenAccent[500] }}
              onClose={handleCloseSnackBar}
            >
              {snackBarMessage}
            </Alert>
          </Snackbar>
        </main>
      </div>
    </>)
}

export default MainPage