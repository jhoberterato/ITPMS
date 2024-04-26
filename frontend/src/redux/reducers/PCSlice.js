import { createSlice } from "@reduxjs/toolkit";

function createData(id, ipAddress, model, user, department, area, pmDetails){
    let tempArray = []
    pmDetails.length > 0 ? 
        pmDetails.map((details) => {
            tempArray.push({
                pmDate: new Date(details.PMDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
                lastPmDate: details.LastPMDate == null ? "No data" : new Date(details.LastPMDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
                nextPmDate: new Date(details.NextPMDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
                pic: details.PIC === null ? '' : details.PIC
            })
        })
    :  Array.from({length: 2}).map((details) => {
            tempArray.push({
                pmDate: 'No data',
                lastPmDate: 'No data',
                nextPmDate: 'No data',
                pic: 'No data'
            })
    })
    return {
      id,
      ipAddress,
      model,
      user,
      department,
      area,
      history: tempArray
    };
}

const origRows = [];
let pcList = await window.$post("pc/getPCList", {})
console.log(pcList)
pcList.data.data.map((data) => {
    origRows.push(createData(data.ID, data.IPAddress, data.Model, data.Name === null ? '' : data.Name, data.Department, data.Location, data.PMDetails))
})

export const pcSlice = createSlice({
    name: 'pc',
    initialState:{
        rows: origRows,
        editID: 0,
        deleteID: 0,
        pcPMDetailsForSubmit: {},
        pcForPrintLabelMultiple: []
    },
    reducers: {
        addRow: (state, action) => {
            state.rows = [
                ...state.rows,
                createData(
                    action.payload.ID,
                    action.payload.IPAddress,
                    action.payload.Model,
                    action.payload.Name,
                    action.payload.Department,
                    action.payload.Location,
                    action.payload.PMDetails
                )
            ]
        },
        editRow: (state, action) => {
            let i = state.rows.findIndex(obj => obj.id == action.payload.ID)
            state.rows[i] = createData(action.payload.ID, action.payload.IPAddress, action.payload.Model, action.payload.Name === null ? '' : action.payload.Name, action.payload.Department, action.payload.Location, action.payload.PMDetails)
        },
        setEditID: (state, action) => {
            state.editID = action.payload
        },
        setDeleteID(state, action){
            state.deleteID = action.payload
        },
        setPCPMDetailsForSubmit(state, action){
            state.pcPMDetailsForSubmit = action.payload
        },
        setPCForPrintLabelMultiple(state, action){
            state.pcForPrintLabelMultiple = action.payload
        }
    }
})