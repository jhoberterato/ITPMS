import React, { useEffect, useRef, useState, useContext } from 'react'
import PropTypes from "prop-types"
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, Paper, useTheme, Button, InputBase, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import { tokens } from '../../../themes';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { openChildModalActions, calendarActions, errorDialogActions } from '../../../redux/actions';
import LabelComp from '../../../components/LabelComp';
import PCLabelSing from '../../../components/PCLabelSing';
import ErrorDialog from '../../../components/ErrorDialog';
import { useNavigate } from 'react-router-dom';
  
function Row(props) {
    const { row, onButtonClick } = props;
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, background: colors.primary[400] }} >
                <TableCell component="th" scope="row">
                    {row.ipAddress}
                </TableCell>
                <TableCell align="center">{row.user}</TableCell>
                <TableCell align="center">{row.area}</TableCell>
                <TableCell align="center">{row.pic}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center" >
                    <CustButton variant={"contained"}
                        startIcon={<EditOutlinedIcon />} 
                        sx={{ background: colors.blueAccent[700], color: colors.grey[100]}}
                        onClick={onButtonClick}
                    >PM</CustButton>
                    <PCLabelSing pcID={row.id}/>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
  
Row.propTypes = {
    row: PropTypes.shape({
        status: PropTypes.string.isRequired,
        ipAddress: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        area: PropTypes.string.isRequired,
        pic: PropTypes.oneOfType([
            PropTypes.string, PropTypes.oneOf([null])
        ])
    }).isRequired,
};
  

const ForPMTable = (origRows) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const colors = tokens(theme.palette.mode)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(4)
    const [filterBy, setFilterBy] = useState("")
    const [filterVal, setFilterVal] = useState("")
    const [rows, setRows] = useState(origRows.origRows)
    const [printCheckList, setPrintCheckList] = useState(false)
    const selectedDate = useSelector(state => state.calendar.pcSelectedDate)
    const user = useSelector(state => state.user.userInfo)
    const pic = `${user.FirstName.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())} ${user.LastName.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}`
    

    const handleFilterChange = (e) => {    
        setFilterVal(e.target.value)
    }
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPage = (e) => {
        setRowsPerPage(+ e.target.value)
        setPage(0)
    }
    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })

    const setOpenChildModal = (id, pmID) => {
        dispatch(calendarActions.setPCIDForPM(id))
        dispatch(calendarActions.setPMIDForPM(pmID))
        dispatch(openChildModalActions.setOpenChildModal())
    }

    const handlePrintCheckList = async () => {
        if(rows.length > 0){
            let check = 0
            rows.map(row => {
                row.status === "For PM" ? check = check + 1 : undefined
            })
            if(check === 0){
                const data = await window.$post("pc/printChecklist", {date: selectedDate, pic: pic, rows: rows})
                if(data.status === "error"){
                    dispatch(errorDialogActions.setMessage(data.message))
                    dispatch(errorDialogActions.setIsOpen())
                }
                else{
                    window.open(`${import.meta.env.VITE_API_URL}/download?file=${data.data.data}`, '_blank')
                }
                
            }
            else{
                dispatch(errorDialogActions.setMessage("Cannot print checklist."))
                dispatch(errorDialogActions.setIsOpen())
            }
        }else{
            dispatch(errorDialogActions.setMessage("Cannot print checklist."))
            dispatch(errorDialogActions.setIsOpen())
        }
    }

    useEffect(() => {      
        if (filterVal === "") {
          setRows(origRows.origRows);
        } else {
            if(filterBy === "ipAddress"){
                setRows(origRows.origRows.filter((row) => row.ipAddress.toLowerCase().includes(filterVal.toLowerCase())));
            } else if(filterBy === "user"){
                setRows(origRows.origRows.filter((row) => row.user.toLowerCase().includes(filterVal.toLowerCase())));
            } else if(filterBy === "area"){
                setRows(origRows.origRows.filter((row) => row.area.toLowerCase().includes(filterVal.toLowerCase())));
            } else if(filterBy === "pic"){
                setRows(origRows.origRows.filter((row) => row.pic.toLowerCase().includes(filterVal.toLowerCase())));
            } else if(filterBy === "status"){
                setRows(origRows.origRows.filter((row) => row.status.toLowerCase().includes(filterVal.toLowerCase())));
            } else{
                setRows(origRows.origRows.filter((row) => row.ipAddress.toLowerCase().includes(filterVal.toLowerCase())));
            }
            
        }
        rows.length > 0 && rows.map(row => {
            row.status === "For PM" ? setPrintCheckList(true) : undefined
        })
    }, [filterVal, origRows, filterBy])

      
    return (<>
        <Box m={"20px"} width={'100%'}>
            <ErrorDialog />
            <Box display={'flex'} alignItems={'stretch'} justifyContent={"space-between"}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                    <CustButton variant={"contained"}
                        onClick={handlePrintCheckList}
                        startIcon={<ChecklistOutlinedIcon />} 
                        sx={{ background: colors.blueAccent[700], color: colors.grey[100], width: '170px', height: '30px'}}
                        disabled={printCheckList}
                    >Print Checklist</CustButton>
                    <LabelComp />
                    {/* <CustButton variant={"contained"}
                        startIcon={<StyleOutlinedIcon />} 
                        sx={{ background: colors.blueAccent[700], color: colors.grey[100], width: '170px', height: '30px', ml: '10px'}}
                        onClick={() => window.print(labels)}
                    >Print Labels</CustButton> */}
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <FormControl variant='filled' sx={{width: '150px', mb: '10px'}} size='small'>
                        <InputLabel sx={{fontSize: "12px", display: filterBy === "" ? undefined : 'none'}}>Filter By</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id={"filter"}
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            name={"filter"}
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '4px', // Adjust the padding as needed
                                    fontSize: '1.1rem', // Adjust the font size as needed
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '0.75rem', // Adjust the font size as needed
                                },
                                '& .MuiFormLabel-root': {
                                    fontSize: '0.75rem', // Adjust the font size as needed
                                },
                                background: colors.primary[400],
                            }}
                        >
                            <MenuItem value="" sx={{fontSize: "10px"}}></MenuItem>
                            <MenuItem value="ipAddress">IP Address</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="area">Area</MenuItem>
                            <MenuItem value="pic">PIC</MenuItem>
                            <MenuItem value="status">Status</MenuItem>
                        </Select>
                    </FormControl>
                    <Box display={"flex"} backgroundColor={colors.primary[400]} borderRadius={"3px"} m={'0 10px 10px 10px'}>
                        <InputBase sx={{ml: 2, flex: 1, width: '120px'}} placeholder="Values..." value={filterVal} onChange={handleFilterChange}/>
                        <IconButton type='button' sx={{p: 1}} onClick={() => {setFilterVal(""); setFilterBy("")}}>{filterVal === "" ? <SearchIcon /> : <CloseOutlinedIcon />}</IconButton>
                    </Box>
                </Box>
            </Box>
            
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead sx={{background: colors.blueAccent[700]}}>
                        <TableRow>
                            <TableCell>IP Address</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Area</TableCell>
                            <TableCell align="center">PIC</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row key={row.id} row={row} onButtonClick={() => setOpenChildModal(row.id, row.pmID)}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                component={"div"}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPage}
            />
        </Box>
    </>)
}

export default ForPMTable