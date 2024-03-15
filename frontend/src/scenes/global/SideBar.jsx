import React, { useEffect } from 'react'
import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { tokens } from '../../themes'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from 'react-redux'

const SideBar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")
  const user = useSelector((state) => state.user.userInfo)
  const [name, setName] = useState('')
  const loc = useLocation()
  useEffect(() => {
    if (user != null) {
      setName(user.Name)
    }

    if(loc.pathname === "/calendar/printer"){
      setSelected("Printer")
    }
    else if(loc.pathname === "/calendar/pc"){
      setSelected("PC/Laptop")
    }
    else if(loc.pathname === "/pc"){
      setSelected("Manage PC/Laptops")
    }
    else if(loc.pathname === "/printer"){
      setSelected("Manage Printers")
    }
    else if(loc.pathname === "/bar"){
      setSelected("Bar Chart")
    }
    else if(loc.pathname === "/pie"){
      setSelected("Pie Chart")
    }
    else if(loc.pathname === "/line"){
      setSelected("Line Chart")
    }
    else{
      setSelected("Dashboard")
    }
  })
  const links = [
    {title : "Dashboard", to: "/home", icon: <HomeOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "Manage PC/Laptops", to: "/pc", icon: <ComputerOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "Manage Printers", to: "/printer", icon: <PrintOutlinedIcon />, selected: selected, setSelected: setSelected},
    // {title : "Contacts Information", to: "/contacts", icon: <ContactsOutlinedIcon />, selected: selected, setSelected: setSelected},
    // {title : "Invoices Balances", to: "/invoices", icon: <ReceiptOutlinedIcon />, selected: selected, setSelected: setSelected},
    // {title : "Profile Form", to: "/form", icon: <PersonOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "PC/Laptop", to: "/calendar/pc", icon: <CalendarTodayOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "Printer", to: "/calendar/printer", icon: <CalendarTodayOutlinedIcon />, selected: selected, setSelected: setSelected},
    // {title : "FAQ Page", to: "/faq", icon: <HelpOutlineOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "Bar Chart", to: "/bar", icon: <BarChartOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "Pie Chart", to: "/pie", icon: <PieChartOutlineOutlinedIcon />, selected: selected, setSelected: setSelected},
    {title : "Line Chart", to: "/line", icon: <TimelineOutlinedIcon />, selected: selected, setSelected: setSelected},
    // {title : "Geography Chart", to: "/geography", icon: <MapOutlinedIcon />, selected: selected, setSelected: setSelected},
  ]
  return (
    <Box sx={{
      "& .pro-sidebar-inner": {background: `${colors.primary[400]} !important`},
      "& .pro-icon-wrapper": {backgroundColor: "transparent !important"},
      "& .pro-inner-item": {padding: "5px 35px 5px 20px !important"},
      "& .pro-inner-item:hover": {color: "#868dfb !important"},
      "& .pro-menu-item.active": {color: "#6870fa !important"},
    }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} 
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100]
            }}
            >
              {!isCollapsed && (
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} ml='15px'>
                  <Typography variant='h3' color={colors.grey[100]}>ADMIN</Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
          </MenuItem>

          {/* User */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                {/* <img alt='avatar' width={"100px"} height={"100px"}
                  src={me}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%"
                  }}
                /> */}
                <AccountCircleOutlinedIcon sx={{fontSize: 80, color: colors.grey[100]}}/>
              </Box>

              <Box textAlign={"center"}>
                <Typography variant='h2' color={colors.grey[100]} fontWeight={"bold"} sx={{m: "10px 0 0 0"}}>SYSTEMS</Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>{window.capitalizedWords(name)}</Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box pl={isCollapsed ? undefined : "10px"}>
            {links.map((link, index) => (
              <React.Fragment key={index}>
                <MenuItem 
                  active={selected === link.title}
                  onClick={() => setSelected(link.title)}
                  icon={link.icon}
                  style={{
                  color: colors.grey[100]
                }}>
                  <Typography>{link.title}</Typography>
                  <Link to={link.to}/>
                </MenuItem>
                {link.title === "Dashboard" ? (
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{m: "15px 0 5px 20px"}}
                  >
                    Data
                  </Typography>
                ) : undefined}
                {link.title === "Manage Printers" ? (
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{m: "15px 0 5px 20px"}}
                  >
                    PM
                  </Typography>
                ) : undefined}
                {link.title === "Printer" ? (
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{m: "15px 0 5px 20px"}}
                  >
                    Charts
                  </Typography>
                ) : undefined}
              </React.Fragment>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default SideBar
