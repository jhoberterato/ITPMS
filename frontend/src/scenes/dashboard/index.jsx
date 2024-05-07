import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PrintDisabledIcon from '@mui/icons-material/PrintDisabled';
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import GeographyChart from "../../components/GeographyChart"
import { useSelector } from "react-redux";

const index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((state) => state.user.userInfo)
  const [firstName, setFirstName] = useState('')
  const [recentPCPM, setRecentPCPM] = useState([])
  const [recentPrinterPM, setRecentPrinterPM] = useState([])
  const [count, setCount] = useState(0)
  const [countPCPM, setCountPCPM] = useState({})
  const [countPrinterPM, setCountPrinterPM] = useState({})

  const formatDate = (date) => {
    const year = new Date(date).getFullYear()
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0')
    const day = String(new Date(date).getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (user != null) {
      setFirstName(user.FirstName)
    }

    const getData = async () => {
      const data = await window.$post("pc/getRecentPM", {})
      const data2 = await window.$post("printer/getRecentPM", {})
      const getCount = await window.$post("equipment/countAll", {})
      const getPCCount = await window.$post("pc/countPM", {})
      const getPrinterCount = await window.$post("printer/countPM", {})
      setRecentPCPM(data.data.data)
      setRecentPrinterPM(data2.data.data)
      setCount(getCount.data.data[0].Count)
      setCountPCPM(getPCCount.data.data[0])
      setCountPrinterPM(getPrinterCount.data.data[0])
    }
    getData()
  })
  const handleTest = () => {
    console.log("test")
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle={`Welcome ${window.capitalizedWords(firstName)}!`} />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                backgroundColor: colors.blueAccent[800],
              }
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt={"10px"}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countPCPM.ForPM}
            subtitle="PC/Laptop For PM"
            subColor={colors.greenAccent[500]}
            progress={countPCPM.ForPM / countPCPM.AllCount}
            icon={
              <PersonalVideoIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countPCPM.LatePM}
            subtitle="PC/Laptop Late PM"
            subColor={'#e2726e'}
            progress={countPCPM.LatePM / countPCPM.AllCount}
            icon={
              <DesktopAccessDisabledIcon
                sx={{ color: '#e2726e', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countPrinterPM.ForPM}
            subtitle="Printer For PM"
            subColor={colors.greenAccent[500]}
            progress={countPrinterPM.ForPM / countPrinterPM.AllCount}
            icon={
              <LocalPrintshopIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countPrinterPM.LatePM}
            subtitle="Printer Late PM"
            subColor={'#e2726e'}
            progress={countPrinterPM.LatePM / countPrinterPM.AllCount}
            icon={
              <PrintDisabledIcon
                sx={{ color: '#e2726e', fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Equipment Representation
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Total Equipment : {count}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent PC/Laptop PM
            </Typography>
          </Box>
          {recentPCPM?.length > 0 && recentPCPM.map((transaction, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.IPAddress}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.Model}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{formatDate(transaction.PMDate)}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.PIC}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Printer Representation
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height={"25vh"}
          >
            <PieChart />
            {/* <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            PC/Laptop Representation
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent PM
            </Typography>
          </Box>
          {recentPrinterPM.map((transaction, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.Location}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.Model}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{formatDate(transaction.PMDate)}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.PIC}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default index;
