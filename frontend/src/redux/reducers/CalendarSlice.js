import { createSlice } from "@reduxjs/toolkit";

const getColor = (status) => {
    const theme = window.sessionStorage.getItem("switchMode")
    let color = {}
    if(status === "For PM"){
        if(theme === "light"){
            color = {
                bg: "#868dfb",
                bd: "#a4a9fc"
            }
        }
        else{
            color ={
                bg: '#535ac8',
                bd: '#3e4396'
            }
        }
    }
    else if(status === "Late PM"){
        if(theme === "light"){
            color = {
                bg: "#db4f4a",
                bd: "#e2726e"
            }
        }
        else{
            color = {
                bg: "#db4f4a",
                bd: "#af3f3b"
            }
        }
    }
    else{
        if(theme === "light"){
            color = {
                bg: "#70d8bd",
                bd: "#4cceac"
            }
        }
        else{
            color = {
                bg: "#3da58a",
                bd: "#4cceac"
            }
        }
    }
    return color
}
let temp = []
const data = await window.$post("pc/getAllPMSchedule", {})
data.data.data.map((d, i) => {
    const year = new Date(d.PMDate).getFullYear()
    const month = String(new Date(d.PMDate).getMonth() + 1).padStart(2, '0')
    const day = String(new Date(d.PMDate).getDate()).padStart(2, '0')
    temp.push({
        id: i,
        title: d.Count,
        groupId: d.Category,
        date: `${year}-${month}-${day}`,
        backgroundColor: d.Category === "For PM" ? getColor("For PM").bg : getColor("Late PM").bg,
        borderColor: d.Category === "For PM" ? getColor("For PM").bd : getColor("Late PM").bd,
    })
});

let temp2 = []
const data2 = await window.$post("pc/getFinishedPM", {})
data2.data.data.map((d, i) => {
    const year = new Date(d.PMDate).getFullYear()
    const month = String(new Date(d.PMDate).getMonth() + 1).padStart(2, '0')
    const day = String(new Date(d.PMDate).getDate()).padStart(2, '0')
    temp2.push({
        id: i,
        title: d.Count,
        groupId: d.Category,
        date: `${year}-${month}-${day}`,
        backgroundColor: getColor(d.Category).bg,
        borderColor: getColor(d.Category).bd,
    })
})

let temp3 = []
const data3 = await window.$post("printer/getAllPMSchedule", {})
data3.data.data.map((d, i) => {
    const year = new Date(d.PMDate).getFullYear()
    const month = String(new Date(d.PMDate).getMonth() + 1).padStart(2, '0')
    const day = String(new Date(d.PMDate).getDate()).padStart(2, '0')
    temp3.push({
        id: i,
        title: d.Count,
        groupId: d.Category,
        date: `${year}-${month}-${day}`,
        backgroundColor: d.Category === "For PM" ? getColor("For PM").bg : getColor("Late PM").bg,
        borderColor: d.Category === "For PM" ? getColor("For PM").bd : getColor("Late PM").bd,
    })
});

let temp4 = []
const data4 = await window.$post("printer/getFinishedPM", {})
data4.data.data.map((d, i) => {
    const year = new Date(d.PMDate).getFullYear()
    const month = String(new Date(d.PMDate).getMonth() + 1).padStart(2, '0')
    const day = String(new Date(d.PMDate).getDate()).padStart(2, '0')
    temp4.push({
        id: i,
        title: d.Count,
        groupId: d.Category,
        date: `${year}-${month}-${day}`,
        backgroundColor: getColor(d.Category).bg,
        borderColor: getColor(d.Category).bd,
    })
});

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        pcSchedule: temp,
        pcFinsihed: temp2,
        pcSelectedDate: "1999-08-07",
        pcSelectedCategory: "",
        pcSelectedLocation: "",
        pmIDForPM: 0,
        pcIDForPM: 0,
        printerIDForPM: 0,
        printerPMIDForPM: 0,
        printerSchedule: temp3,
        printerFinished: temp4,
        printerSelectedDate: "1999-08-07",
        printerSelectedCategory: "",
        printerSelectedLocation: "",
        printerModelForPM: ""
    },
    reducers: {
        setPCSelectedDate(state, action){
            state.pcSelectedDate = action.payload
        },
        setPCSelectedCategory(state, action){
            state.pcSelectedCategory = action.payload
        },
        setPMIDForPM(state, action){
            state.pmIDForPM = action.payload
        },
        setPCIDForPM(state, action){
            state.pcIDForPM = action.payload
        },
        setPCSelectedLocation(state, action){
            state.pcSelectedLocation = action.payload
        },
        setPrinterSelectedDate(state, action){
            state.printerSelectedDate = action.payload
        },
        setPrinterSelectedCategory(state, action){
            state.printerSelectedCategory = action.payload
        },
        setPrinterIDForPM(state, action){
            state.printerIDForPM = action.payload
        },
        setPrinterPMIDForPM(state, action){
            state.printerPMIDForPM = action.payload
        },
        setPrinterSelectedLocation(state, action){
            state.printerSelectedLocation = action.payload
        },
        setPrinterModelForPM(state, action){
            state.printerModelForPM = action.payload
        }
    }
})

