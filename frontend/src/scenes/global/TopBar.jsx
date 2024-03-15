import React, {useEffect, useState} from 'react'
import {Box, IconButton, useTheme, Badge, Popper, Fade, Button, SwipeableDrawer, Divider, Typography, Avatar, Stack } from "@mui/material"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import { useContext } from 'react'
import { ColorModeContext, tokens } from "../../themes"
import { useNavigate } from 'react-router-dom';
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import LaptopIcon from '@mui/icons-material/Laptop';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import PrintIcon from '@mui/icons-material/Print';

const TopBar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const [notification, setNotification] = useState(0)
  const [notifAnchor, setNotifAnchor] = useState(null)
  const [allData, setAllData] = useState([])
  const [pcData, setPCData] = useState([])
  const [printerData, setPrinterData] = useState([])
  const [openNotif, setOpenNotif] = useState(false)

  const [tabValue, setTabValue] = useState('1')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  const handleNotifClick = (e) => {
    setNotifAnchor(e.currentTarget)
    setOpenNotif(prev => !prev)
  }

  const handleChangeTab = (e, newVal) => {
    setTabValue(newVal)
  }

  const handleLogout = () => {
    window.sessionStorage.clear()
    navigate('/')
  }
  const CustButton = styled(Button)({
    '&:hover': {
        background: colors.redAccent[500]
    }
  })

  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = new Date(date).getDate();
    const month = months[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    const getNotification = async () => {
      const data = await window.$post("equipment/getNotifications", {})
      if(data.data.status === "success"){
        setNotification(data.data.data.pc.length + data.data.data.printer.length)
        setPCData([...data.data.data.pc])
        setPrinterData([...data.data.data.printer])
        setAllData([...data.data.data.pc, data.data.data.printer])
      }
    }

    getNotification()
  }, [])
  return (
    <Box display={"flex"} justifyContent={"space-between"} p={2}>
      {/* Search Bar */}
      <Box display={"flex"} backgroundColor={colors.primary[400]} borderRadius={"3px"}>
        <InputBase sx={{ml: 2, flex: 1}} placeholder="Search..."/>
        <IconButton type='button' sx={{p: 1}}><SearchIcon /></IconButton>
      </Box>
      {/* Icons */}
      <Box display={'flex'}>
        <Popper
          open={openNotif}
          anchorEl={notifAnchor}
          placement={'bottom-end'}
          transition
          sx={{
            background: colors.primary[400],
            borderRadius: '8px',
            border: `1px solid ${colors.greenAccent[800]}`,
            zIndex: 99999
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{width: '300px', p: 2, height: '220px', zIndex: 99999}}>
                <Typography sx={{ fontWeight: 'bold' }} variant='body1'>Notifications</Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChangeTab} aria-label="lab API tabs example" indicatorColor={'secondary'}>
                        <Tab label="All" value="1" sx={{fontSize: '10px', p: 0, minWidth: '9vh'}}/>
                        <Tab label="PC/Laptop" value="2" sx={{fontSize: '10px', p: 0, minWidth: '9vh'}}/>
                        <Tab label="Printer" value="3" sx={{fontSize: '10px', p: 0, minWidth: '9vh'}}/>
                      </TabList>
                    </Box>
                    {["1", "2", "3"].map((d, i) => (
                      <TabPanel
                        value={d}
                        key={i}
                        sx={{
                          p: '10px 0 0 0',
                          height: '120px',
                          overflowY: 'auto'
                        }}
                      >
                        {d === "1" ? (
                          <Box m={"10px 0"}>
                            {pcData.map((pc, index) => (
                            
                              <Stack direction="row" spacing={1}>
                                <Avatar sx={{
                                  width: 35,
                                  height: 35
                                }}>
                                  {pc.Type === "Laptop" ? <LaptopIcon sx={{fontSize: 15}}/> : <PersonalVideoIcon sx={{fontSize: 15}}/>}
                                </Avatar>
                                <Box>
                                  <Typography variant='subtitle2' fontWeight={'bold'}>{pc.Model}</Typography>
                                  <Typography variant='caption' sx={{color: colors.grey[500]}}>{`${pc.Status} ${formatDate(pc.PMDate)}`}</Typography>
                                </Box>
                                
                              </Stack>
                            ))}
                            {printerData.map((printer, index) => (
                                <Stack direction="row" spacing={1}>
                                  <Avatar sx={{
                                    width: 35,
                                    height: 35
                                  }}>
                                    <PrintIcon sx={{fontSize: 15}}/>
                                  </Avatar>
                                  <Box>
                                    <Typography variant='subtitle2' fontWeight={'bold'}>{printer.Model}</Typography>
                                    <Typography variant='caption' sx={{color: colors.grey[500]}}>{`${printer.Status} ${formatDate(printer.PMDate)}`}</Typography>
                                  </Box>
                                  
                                </Stack>
                              
                            ))}
                          </Box>
                        )
                        : d === "2" ? pcData.map((pc, index) => (
                          <Box key={index} m={"10px 0"}>
                            <Stack direction="row" spacing={1}>
                              <Avatar sx={{
                                width: 35,
                                height: 35
                              }}>
                                {pc.Type === "Laptop" ? <LaptopIcon sx={{fontSize: 15}}/> : <PersonalVideoIcon sx={{fontSize: 15}}/>}
                              </Avatar>
                              <Box>
                                <Typography variant='subtitle2' fontWeight={'bold'}>{pc.Model}</Typography>
                                <Typography variant='caption' sx={{color: colors.grey[500]}}>{`${pc.Status} ${formatDate(pc.PMDate)}`}</Typography>
                              </Box>
                              
                            </Stack>
                          </Box>
                        )) : printerData.map((printer, index) => (
                          <Box key={index} m={"10px 0"}>
                            <Stack direction="row" spacing={1}>
                              <Avatar sx={{
                                width: 35,
                                height: 35
                              }}>
                                <PrintIcon sx={{fontSize: 15}}/>
                              </Avatar>
                              <Box>
                                <Typography variant='subtitle2' fontWeight={'bold'}>{printer.Model}</Typography>
                                <Typography variant='caption' sx={{color: colors.grey[500]}}>{`${printer.Status} ${formatDate(printer.PMDate)}`}</Typography>
                              </Box>
                              
                            </Stack>
                          </Box>
                        ))}
                      </TabPanel>
                    ))}
                  </TabContext>
                </Box>
              </Box>
            </Fade>
          )}
        </Popper>
        <Popper
          sx={{ zIndex: 1200 }}
          open={open}
          anchorEl={anchorEl}
          placement={'bottom-end'}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <CustButton variant={"contained"}
                  size='small'
                  startIcon={<LogoutOutlinedIcon />} 
                  sx={{ background: colors.redAccent[600], color: colors.grey[100], mt: '5px'}}
                  onClick={handleLogout}
              >Logout</CustButton>
            </Fade>
          )}
        </Popper>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        <IconButton onClick={handleNotifClick}>
          {notification === 0 ? (
            <NotificationsOutlinedIcon />
          ) : (
            <Badge badgeContent={notification} color={"secondary"}>
              <NotificationsOutlinedIcon />
            </Badge>
          )}
        </IconButton>
        
        
        <IconButton onClick={() => setOpenSetting(true)}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
      <SwipeableDrawer
          anchor='right'
          open={openSetting}
          onClose={() => setOpenSetting(false)}
          onOpen={() => setOpenSetting(true)}
        >
          <Box 
            sx={{
              width: 250
            }}
            role="presentation"
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                width: '100%',
                p: 1,
              }}
            >
                <Typography variant='h5'>Setting</Typography>
                <IconButton onClick={() => setOpenSetting(false)}>
                  <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Divider/>
            <Box
              sx={{
                height: '90vh'
              }}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
                <Typography>Feature Not Available</Typography>
                <Box>
                  <SentimentVeryDissatisfiedIcon sx={{fontSize: 40}}/>
                  <SentimentVeryDissatisfiedIcon sx={{fontSize: 40}}/>
                  <SentimentVeryDissatisfiedIcon sx={{fontSize: 40}}/>
                </Box>
                
            </Box>
          </Box>
        </SwipeableDrawer>
    </Box>
  )
}

export default TopBar

// x2002
// Change in Company name