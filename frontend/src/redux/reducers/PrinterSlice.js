import { createSlice } from "@reduxjs/toolkit";

function createData(id, model, serialNo, area, pmDetails) {
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
      model,
      serialNo,
      area,
      history: tempArray
    }
}

const origRows = [];
let printerList = await window.$post("printer/getPrinterList", {})
printerList.data.data.map((data) => {
    origRows.push(createData(data.ID, data.Model, data.SerialNumber, data.Location, data.PMDetails))
})

export const printerSlice = createSlice({
    name: 'printer',
    initialState: {
        rows: origRows,
        editID: 0,
        deleteID: 0,
        printerForPrintLabelMultiple: []
    },
    reducers: {
        addRow(state, action){
            state.rows = [...state.rows, createData(action.payload.ID, action.payload.Model, action.payload.SerialNumber, action.payload.Location, action.payload.PMDetails)]
        },
        setEditID: (state, action) => {
            state.editID = action.payload
        },
        editRow(state, action){
            let i = state.rows.findIndex(obj => obj.id == action.payload.ID)
            state.rows[i] = createData(action.payload.ID, action.payload.Model, action.payload.SerialNumber, action.payload.Location, action.payload.PMDetails)
        },
        setDeleteID(state, action){
            state.deleteID = action.payload
        },
        setPrinterForPrintLabelMultiple(state, action){
            state.printerForPrintLabelMultiple = action.payload
        }
    }
})