import React, { useEffect, useState } from 'react'
import PropTypes, { array } from "prop-types"
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, Typography, Paper, useTheme, Button, InputBase, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import { tokens } from '../../themes';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from '../../components/Header';
import ModalComp from '../../components/ModalComp';
import AddNewForm from './AddNewForm';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import EditModalComp from '../../components/EditModalComp';
import DeleteDialog from '../../components/DeleteDialog';
import SearchIcon from '@mui/icons-material/Search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { pcActions, modalActions } from '../../redux/actions';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
  
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()
    const CustButton = styled(Button)({
        '&:hover': {
            background: colors.blueAccent[600]
        }
    })
    const handleOpenEdit = (id) => {
        dispatch(modalActions.setEditModalComp('edit'))
        dispatch(pcActions.setEditID(id))
        dispatch(modalActions.setOpenEditModal())
    }
    const handleDelete= (id) => {
        dispatch(modalActions.setEditModalComp('delete'))
        dispatch(pcActions.setDeleteID(id))
        dispatch(modalActions.setOpenDeleteDialog())
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, background: colors.primary[400] }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.ipAddress}
                </TableCell>
                <TableCell align="center">{row.model}</TableCell>
                <TableCell align="center">{row.user}</TableCell>
                <TableCell align="center">{row.department}</TableCell>
                <TableCell align="center">{row.area}</TableCell>
                <TableCell align="center">
                    <CustButton variant={"contained"}
                        onClick={() => handleOpenEdit(row.id)}
                        startIcon={<EditOutlinedIcon />} 
                        sx={{ background: colors.blueAccent[700], color: colors.grey[100]}}
                    >Edit</CustButton>
                    <CustButton variant={"contained"}
                        onClick={() => handleDelete(row.id)}
                        startIcon={<DeleteOutlinedIcon />} 
                        sx={{ background: colors.redAccent[700], color: colors.grey[100], ml: '5px', '&:hover': {
                            background: colors.redAccent[600]
                        }}}
                    >Remove</CustButton>
                </TableCell>
            </TableRow>
            <TableRow sx={{background: colors.primary[400]}}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">PM Date</TableCell>
                                        <TableCell align="center">Last PM Date</TableCell>
                                        <TableCell align="center">Next PM Date</TableCell>
                                        <TableCell align="center">PIC</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" align="center">
                                                {historyRow.pmDate}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.lastPmDate}</TableCell>
                                            <TableCell align="center">{historyRow.nextPmDate}</TableCell>
                                            <TableCell align="center">
                                                {historyRow.pic}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
  
Row.propTypes = {
    row: PropTypes.shape({
        model: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                pmDate: PropTypes.string.isRequired,
                lastPmDate: PropTypes.string.isRequired,
                nextPmDate: PropTypes.string.isRequired,
                pic: PropTypes.string.isRequired,
            }),
        ).isRequired,
        id: PropTypes.number.isRequired,
        area: PropTypes.string.isRequired,
    }).isRequired,
};


const Index = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [filterBy, setFilterBy] = useState("")
    const [filterVal, setFilterVal] = useState("")
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const origRows = useSelector((state) => state.pc.rows)
    const modal = useSelector((state) => state.modal.editModalComp)
    const [rows, setRows] = useState(origRows)

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

    const handleSearch = () => {
        setIsSearchClicked(prev => !prev)
        setRows(origRows)
        if(!isSearchClicked){
            if (filterVal === "") {
                setRows(origRows)
            } else {
                setRows(origRows)
                if(filterBy === "ipAddress"){
                    setRows(rows.filter((row) => row.ipAddress.toLowerCase().includes(filterVal.toLowerCase())));
                } else if(filterBy === "model"){
                    setRows(rows.filter((row) => row.model.toLowerCase().includes(filterVal.toLowerCase())));
                } else if(filterBy === "user"){
                    setRows(rows.filter((row) => row.user.toLowerCase().includes(filterVal.toLowerCase())));
                } else if(filterBy === "department"){
                    setRows(rows.filter((row) => row.department.toLowerCase().includes(filterVal.toLowerCase())));
                } else if(filterBy === "area"){
                    setRows(rows.filter((row) => row.area.toLowerCase().includes(filterVal.toLowerCase())));
                } else{
                    setRows(rows.filter((row) => row.ipAddress.toLowerCase().includes(filterVal.toLowerCase())));
                }
                
            }
        }
        else{
            setFilterVal("")
            setFilterBy("")
            setRows(origRows)
        }
    }

    useEffect(() => {
        setRows(origRows)
    }, [origRows]);
    
    return (<>
        <Box m={"20px"}>
            <Header title={"PC/Laptop"} subtitle={"List of pc, laptops and tablets."} />
            {modal === "edit" ? <EditModalComp title={"Edit PC/Laptop"} widthProps={'50%'}><EditForm /></EditModalComp> : <DeleteDialog><DeleteForm /></DeleteDialog>}
            <Box display={'flex'} alignItems={'stretch'} justifyContent={"space-between"}>
                <ModalComp title={"Add New PC/Laptop"} isShow={true} buttonOpenName={"ADD"} widthProps={'50%'}><AddNewForm /></ModalComp>
                <Box display={'flex'} alignItems={'stretch'} justifyContent={"space-between"}>
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
                                background: colors.primary[400]
                            }}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="ipAddress">IP Address</MenuItem>
                            <MenuItem value="model">Model</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="department">Department</MenuItem>
                            <MenuItem value="area">Area</MenuItem>
                        </Select>
                    </FormControl>
                    <Box display={"flex"} backgroundColor={colors.primary[400]} borderRadius={"3px"} m={'0 10px 10px 10px'}>
                        <InputBase sx={{ml: 2, flex: 1, width: '120px'}} placeholder="Values..." value={filterVal} onChange={handleFilterChange}/>
                        <IconButton type='button' sx={{p: 1}} onClick={handleSearch}>{isSearchClicked && filterVal != "" ? <CloseOutlinedIcon /> : <SearchIcon />}</IconButton>
                    </Box>
                </Box>
            </Box>
            
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead sx={{background: colors.blueAccent[700]}}>
                        <TableRow>
                            <TableCell />
                            <TableCell>IP Address</TableCell>
                            <TableCell align="center">Model</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Area</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <Row key={index} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20 , 30 , 40, 50, 60, 70, 80, 90, 100, 200, 300]}
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

export default Index