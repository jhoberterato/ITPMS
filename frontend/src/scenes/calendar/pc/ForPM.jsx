import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../themes';
import ForPMTable from './ForPMTable';
import { useSelector, useDispatch } from 'react-redux';
import { calendarActions, pcActions } from '../../../redux/actions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{width: '100%'}}
            >
            {value === index && (
                <Box variant="scrollable" sx={{ 
                    p: 3,
                    color: colors.primary[100],
                    overflowY: 'auto',
                    height: '100%',
                    width: '100%'
                }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const ForPM = () => {
    const [value, setValue] = React.useState(0);
    const [key, setKey] = useState(0)
    const theme = useTheme()
    const dispatch = useDispatch()
    const colors = tokens(theme.palette.mode)
    const category = useSelector(state => state.calendar.pcSelectedCategory)
    const selectedDate = useSelector(state => state.calendar.pcSelectedDate)
    const [forPMList, setForPMList] = useState([])
    const [tabs, setTabs] = useState([])
    const user = useSelector(state => state.user.userInfo)
    const pic = `${user.FirstName[0].toLowerCase()}${user.LastName.toLowerCase()}`
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const formatDate = (date) => {
        const year = new Date(date).getFullYear()
        const month = String(new Date(date).getMonth() + 1).padStart(2, '0')
        const day = String(new Date(date).getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }
    const handleTab = async (index) => {
        setKey((prev) => prev + 1)
        dispatch(calendarActions.setPCSelectedLocation(tabs[index].location))
        const data = await window.$post("pc/getForPMList", {date: selectedDate, location: tabs[index].location, category: category})
                
        if(data.data.data.length > 0){
            setForPMList([])
            let forPrintLabel = []
            data.data.data.map((dd, index) => {
                setForPMList((prev) => [...prev, {
                    id: dd.ID,
                    pmID: dd.PMID,
                    ipAddress: dd.IPAddress,
                    user: dd.Name,
                    area: dd.Location, 
                    pic: dd.PIC,
                    status: dd.Status
                }])
                forPrintLabel.push({
                    ipAddress: dd.IPAddress,
                    pcName: dd.PCName,
                    pmDate: formatDate(dd.PMDate),
                    pmBy: dd.PIC == null ? pic : dd.PIC,
                    model: dd.ModelSN,
                    dueDate: formatDate(dd.NextPMDate),
                    location: dd.Location
                })
            })
            dispatch(pcActions.setPCForPrintLabelMultiple(forPrintLabel))
        }
    }
    useEffect(() => {
        const getSched = async () => {
            const data = await window.$post("pc/getPMSchedByDate", {date: selectedDate, status: category})
            setTabs([])
            dispatch(calendarActions.setPCSelectedLocation(data.data.data[0].Location))
            if(data.data.data.length > 0){
                data.data.data.map((d, index) => {
                    setTabs((prev) => [...prev, {
                        name: `${d.Location} [${d.Count}]`,
                        index: index,
                        location: d.Location
                    }])
                })
                const data2 = await window.$post("pc/getForPMList", {date: selectedDate, location: data.data.data[0].Location, category: category})
                if(data2.data.data.length > 0){
                    let forPrintLabel = []
                    setForPMList([])
                    data2.data.data.map((dd, index) => {
                        setForPMList((prev) => [...prev, {
                            id: dd.ID,
                            pmID: dd.PMID,
                            ipAddress: dd.IPAddress,
                            user: dd.Name,
                            area: dd.Location, 
                            pic: dd.PIC,
                            status: dd.Status
                        }])
                        forPrintLabel.push({
                            ipAddress: dd.IPAddress,
                            pcName: dd.PCName,
                            pmDate: formatDate(dd.PMDate),
                            pmBy: dd.PIC == null ? pic : dd.PIC,
                            model: dd.ModelSN,
                            dueDate: formatDate(dd.NextPMDate),
                            location: dd.Location
                        })
                    })
                    dispatch(pcActions.setPCForPrintLabelMultiple(forPrintLabel))
                }
            }
            
        }
        getSched()
    }, [])

    return (<>
        <Box
            sx={{ 
                flexGrow: 1,
                backgroundColor: 'tranparent',
                display: 'flex',
                height: 450,
                color: colors.primary[100],
                border: 1,
                borderColor: 'divider',
                borderRadius: '0 10px 10px 0',
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                textColor='secondary'
                indicatorColor='secondary'
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ border: 1, borderColor: 'divider', borderRadius: '10px 0 0 10px',}}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        label={tab.name}
                        key={index}
                        {...a11yProps(tab.index)}
                        onClick={() => handleTab(index)}
                    />
                ))}
            </Tabs>
            <ForPMTable key={key} origRows={forPMList}/>
            {/* <TabPanel value={value} index={0} width={'100%'} component="span">
                <>
                    <VirtualTableComp />
                </>
            </TabPanel>
            <TabPanel value={value} index={1}>
                sdfsdf
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel> */}
        </Box>
    </>)
}

export default ForPM