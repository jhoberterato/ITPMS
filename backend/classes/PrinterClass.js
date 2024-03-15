const path = require("path")
const printer_model = require("../model/ModelPrinter")
const pm_model = require("../model/ModelPrinterPM")
const ExcelJS = require("exceljs")
const fs = require("fs")

module.exports = class Printer{
    constructor(item){
        this.printer = new printer_model()
        this.pm = new pm_model()
        this.item = item
    }

    async getPrinterList(){
        let res ={}
        try{
            let data = await this.printer.getPrinterList()
            if(data.length > 0){
                res.status = 'success'
                let newData = []
                await Promise.all(data.map(async (data) => {
                    const pmDetails = await this.pm.getPMDetails(data.ID)
                    newData.push({...data, PMDetails: pmDetails})
                }))
                res.data = newData
            }
            else{
                res.data = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message  = err.message
        }

        return res
    }

    async getPrinter(){
        let res = {}
        try{
            let data = await this.printer.getPrinter(this.item.id)
            if(data.length > 0){
                res.status = "success"
                let newData = []
                await Promise.all(data.map(async (data) => {
                    const pmDetails = await this.pm.getPMDetails(this.item.id)
                    newData.push({...data, PMDetails: pmDetails})
                }))
                res.data = newData
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.data = "error"
            res.message = err.message
        }
        return res
    }

    async addPrinter(){
        let res = {}
        try{
            const isExist = await this.printer.checkIfExist(this.item.model, this.item.serialNo)
            if(isExist.length> 0){
                res.status = "error"
                res.message = "Data already exist."
            }
            else{
                const addPrinterVal = `'${this.item.model}', '${this.item.serialNo}', '${this.item.area}'`
                res.status = "success"
                await this.printer.addPrinter(addPrinterVal)
                const getPrinterIDCondition = `Model = '${this.item.model}' and SerialNumber = '${this.item.serialNo}' and Location = '${this.item.area}'`
                let newPrinterID = await this.printer.getPrinterID(getPrinterIDCondition)
                res.data = await this.pm.addPrinterPMDetails(`'${newPrinterID[0].ID}', '${this.item.pmDate}', '${this.nextPMDate(this.item.pmDate)}'`)
                res.addedID = newPrinterID
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async updatePrinter(){
        let res ={}
        try{
            const set = `Model = '${this.item.model}', SerialNumber = '${this.item.serialNo}', Location = '${this.item.area}'`
            await this.printer.updatePrinter(set, this.item.id)
            const pmSet =  `PMDate = '${this.item.pmDate}', NextPMDate = '${this.item.nextPmDate}', LastPMDate = '${this.item.lastPmDate}'`
            res.status = "success"
            res.data = await this.pm.updatePM(pmSet, this.item.pmID)
        }
        catch(err){
            res.status = 'error'
            res.message = err.message
        }

        return res
    }

    async deletePrinter(){
        let res = {}
        try{
            await this.printer.deletePrinter(this.item.id)
            await this.pm.deletePM(this.item.id)
            res.status = "success"
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getAllPMSchedule(){
        let res = {}
        try{
            const data = await this.pm.getAllPMSchedule()
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getFinishedPM(){
        let res = {}
        try{
            const data = await this.pm.getFinishedPM()
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getPMSchedByDate(){
        let res = {}
        try{
            let condition = ''
            switch(this.item.status){
                case "For PM": {
                    condition = `pm.PIC is null`
                    break
                }
                case "Late PM": {
                    condition = `pm.PIC is null`
                    break
                }
                case "Finished": {
                    condition = `not(pm.PIC is null)`
                    break
                }
            }
            const getDepartment = await this.pm.getPMSchedByDep(this.item.date, condition)
            res.status = "success"
            res.data = getDepartment
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getForPMList() {
        let res = {}
        try{
            const data = await this.pm.getForPMList(this.item.date, this.item.location, this.item.category)
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getForPMDetails(){
        let res = {}
        try{
            const data = await this.pm.getForPMDetails(this.item.id)
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.data = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getLabelDetails(){
        let res = {}
        try{
            const data = await this.pm.getLabelDetails(this.item.id, this.item.pmDate, this.item.location)
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.data = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async submitPM(){
        let res = {}
        try{
            const model = this.item.model
            let cols = ""
            if(model.toLowerCase().includes("brother")){
                cols = `Cover = '${this.item.values.cover}', CoverAction = '${this.item.values.coverAction}', RibbonWinding = '${this.item.values.ribbonWinding}', RibbonWindingAction = '${this.item.values.ribbonWindingAction}',
                        RollerNotLoose = '${this.item.values.rollerNotLoose}', RollerNotLooseAction = '${this.item.values.rollerNotLooseAction}', RollerClean = '${this.item.values.rollerClean}', RollerCleanAction = '${this.item.values.rollerCleanAction}',
                        CuttersSharp = '${this.item.values.cuttersSharp}', CuttersSharpAction = '${this.item.values.cuttersSharpAction}', CutterClean = '${this.item.values.cuttersClean}', CuttersCleanAction = '${this.item.values.cuttersCleanAction}',
                        FeedButton = '${this.item.values.feedButton}', FeedButtonAction = '${this.item.values.feedButtonAction}', CutButton = '${this.item.values.cutButton}', CutButtonAction = '${this.item.values.cutButtonAction}',
                        LabelOutlet = '${this.item.values.labelOutlet}', LabelOutletAction = '${this.item.values.labelOutletAction}', PIC = '${this.item.values.pic}', Remarks = '${this.item.values.remarks}'
                    `
            }
            else{
                cols = `Cover = '${this.item.values.cover}', CoverAction = '${this.item.values.coverAction}', RibbonWinding = '${this.item.values.ribbonWinding}', RibbonWindingAction = '${this.item.values.ribbonWindingAction}',
                        HeaderLockLever = '${this.item.values.headerLockLever}', HeaderLockLevelAction = '${this.item.values.headerLockLeverAction}', ThermalHeader = '${this.item.values.thermalHeader}', ThermalHeaderAction = '${this.item.values.thermalHeaderAction}',
                        RollerClean = '${this.item.values.rollerClean}', RollerCleanAction = '${this.item.values.rollerCleanAction}', Pitch = '${this.item.values.pitch}', PitchAction = '${this.item.values.pitchAction}',
                        Offset = '${this.item.values.offset}', OffsetAction = '${this.item.values.offsetAction}', Darkness = '${this.item.values.darkness}', DarknessAction = '${this.item.values.darknessAction}',
                        Speed = '${this.item.values.speed}', SpeedAction = '${this.item.values.speedAction}', PIC = '${this.item.values.pic}', Remarks = '${this.item.values.remarks}'
                    `
            }
            const data = await this.pm.submitPM(cols, this.item.values.id)
            const check = await this.pm.checkNextPM(this.item.printerID)
            if(check[0].ID == this.item.values.id){
                const pmDate = check[0].NextPMDate
                await this.pm.addPrinterPMDetails(`'${this.item.printerID}', '${this.formatDate(pmDate)}', '${this.nextPMDate(this.formatDate(pmDate))}'`)
            }
            else{
                console.log("bawal na")
            }

            res.status = "success"
            res.data = data
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async printerPie(){
        let res = {}
        try{
            const data = await this.printer.printerPie()
            if(data.length > 0){
                const temp = [
                    {
                        id: "Brother",
                        label: "Brother",
                        value: data[0].Brother,
                        color: 'red'
                    },
                    {
                        id: "EPSON",
                        label: "EPSON",
                        value: data[0].Epson,
                        color: 'blue'
                    },
                    {
                        id: "SATO",
                        label: "SATO",
                        value: data[0].Sato,
                        color: 'green'
                    },
                    {
                        id: "Other",
                        label: "Other",
                        value: data[0].Other,
                        color: 'yellow'
                    },
                ]
                res.status = 'success'
                res.data = temp
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getRecentPM(){
        let res = {}
        try{
            const data = await this.pm.getRecentPM()
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async countPM(){
        let res = {}
        try{
            const data = await this.pm.countPM()
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async printChecklist(){
        let res = {}
        try{
            const data = await this.pm.getForCheckListDetails(this.item.id)
            if(data.length > 0){
                const workbook = new ExcelJS.Workbook()
                const brotherpath = fs.realpathSync("./Template/Brother_Checklist.xlsx", {encoding: 'utf-8'})
                const epsonpath = fs.realpathSync("./Template/EPSON_Checklist.xlsx", {encoding: 'utf-8'})

                await workbook.xlsx.readFile(data[0].Model.toLowerCase().includes('brother') ? brotherpath : epsonpath)

                const finish = workbook.addImage({
                    filename: fs.realpathSync("./Template/images/printerFinish.png", {encoding: 'utf8'}),
                    extension: "png",
                })
                const notApplicable = workbook.addImage({
                    filename: fs.realpathSync("./Template/images/printerNotApplicable.png", {encoding: 'utf8'}),
                    extension: "png",
                })
                const errorProblem = workbook.addImage({
                    filename: fs.realpathSync("./Template/images/printerErrorProblem.png", {encoding: 'utf8'}),
                    extension: "png",
                })
                
                const worksheet = workbook.getWorksheet("Sheet1")
                worksheet.getCell(`J4`).value = data[0].PIC.toUpperCase()
                worksheet.getCell(`K4`).value = "R.REMO"
                worksheet.getCell(`L4`).value = "R.REMO"
                worksheet.addImage(this.judge(data[0].Cover, finish, notApplicable, errorProblem), `F18:I18`)
                worksheet.getCell(`J18`).value = data[0].CoverAction == null ? "" : data[0].CoverAction

                if(data[0].Model.toLowerCase().includes('brother')){
                    worksheet.getCell(`D11`).value = data[0].SerialNumber
                    worksheet.getCell(`D12`).value = data[0].Location
                    worksheet.getCell(`D13`).value = "Semi-Annual"
                    worksheet.getCell(`K11`).value = this.formatDate(data[0].PMDate)
                    worksheet.getCell(`K12`).value = this.getWeek(data[0].PMDate)
                    
                    worksheet.addImage(this.judge(data[0].RollerNotLoose, finish, notApplicable, errorProblem), `F19:I19`)
                    worksheet.getCell(`J19`).value = data[0].RollerNotLooseAction
                    worksheet.addImage(this.judge(data[0].RollerClean, finish, notApplicable, errorProblem), `F20:I20`)
                    worksheet.getCell(`J20`).value = data[0].RollerCleanAction
                    worksheet.addImage(this.judge(data[0].CuttersSharp, finish, notApplicable, errorProblem), `F21:I21`)
                    worksheet.getCell(`J21`).value = data[0].CuttersSharpAction
                    worksheet.addImage(this.judge(data[0].CutterClean, finish, notApplicable, errorProblem), `F22:I22`)
                    worksheet.getCell(`J22`).value = data[0].CuttersCleanAction
                    worksheet.addImage(this.judge(data[0].FeedButton, finish, notApplicable, errorProblem), `F23:I23`)
                    worksheet.getCell(`J23`).value = data[0].FeedButtonAction
                    worksheet.addImage(this.judge(data[0].CutButton, finish, notApplicable, errorProblem), `F24:I24`)
                    worksheet.getCell(`J24`).value = data[0].CutButtonAction
                    worksheet.addImage(this.judge(data[0].LabelOutlet, finish, notApplicable, errorProblem), `F25:I25`)
                    worksheet.getCell(`J25`).value = data[0].LabelOutletAction

                }
                else{
                    worksheet.getCell(`D11`).value = data[0].Model
                    worksheet.getCell(`D12`).value = data[0].Model
                    worksheet.getCell(`D13`).value = data[0].SerialNumber
                    worksheet.getCell(`D14`).value = data[0].Location
                    worksheet.getCell(`K11`).value = this.formatDate(data[0].PMDate)
                    worksheet.getCell(`K12`).value = this.getWeek(data[0].PMDate)
                    worksheet.getCell(`K13`).value = "Semi-Annual"

                    worksheet.addImage(this.judge(data[0].RibbonWinding, finish, notApplicable, errorProblem), `F19:I19`)
                    worksheet.getCell(`J19`).value = data[0].RibbonWindingAction
                    worksheet.addImage(this.judge(data[0].HeaderLockLever, finish, notApplicable, errorProblem), `F20:I20`)
                    worksheet.getCell(`J20`).value = data[0].HeaderLockLevelAction
                    worksheet.addImage(this.judge(data[0].ThermalHeader, finish, notApplicable, errorProblem), `F21:I21`)
                    worksheet.getCell(`J21`).value = data[0].ThermalHeaderAction
                    worksheet.addImage(this.judge(data[0].RollerClean, finish, notApplicable, errorProblem), `F22:I22`)
                    worksheet.getCell(`J22`).value = data[0].RollerCleanAction
                    worksheet.addImage(this.judge(data[0].Pitch, finish, notApplicable, errorProblem), `F23:I23`)
                    worksheet.getCell(`J23`).value = data[0].PitchAction
                    worksheet.addImage(this.judge(data[0].Offset, finish, notApplicable, errorProblem), `F24:I24`)
                    worksheet.getCell(`J24`).value = data[0].OffsetAction
                    worksheet.addImage(this.judge(data[0].Darkness, finish, notApplicable, errorProblem), `F25:I25`)
                    worksheet.getCell(`J25`).value = data[0].DarknessAction
                    worksheet.addImage(this.judge(data[0].Speed, finish, notApplicable, errorProblem), `F26:I26`)
                    worksheet.getCell(`J26`).value = data[0].SpeedAction
                }

                worksheet.getCell(`A62`).value = `Remarks: ${data[0].Remarks}`

                const fileName = `${this.formatDate(data[0].PMDate)}_${data[0].Location}.xlsx`
                await workbook.xlsx.writeFile(`./public/generated/printer/${fileName}`);
                res.status = "success"
                res.data = `printer/${fileName}`
            }
            else{
                res.status = "error"
                res.message = "No data found"
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    nextPMDate(dateStr){
        const date = new Date(dateStr)
        let nextPM = new Date()
        date.setMonth(date.getMonth() + 6)
        if(date.getDate() === 1){
            let prevdate = new Date(date.getFullYear(), date.getMonth() - 1, 1)
            let dateTemp = new Date(prevdate.getFullYear(), prevdate.getMonth() + 1, 0)
            if(dateTemp.getDay === 6){
                nextPM = dateTemp.setDate(dateTemp.getDate() - 1)
            }
            else if(dateTemp.getDay() === 0){
                nextPM = dateTemp.setDate(dateTemp.getDate() - 2)
            }
            else{
                nextPM = dateTemp
            }
        }
        else{
            nextPM = date.setDate(date.getDate())
        }
        return new Date(nextPM).toISOString().substring(0, 10)
    }

    formatDate(date){
        const year = new Date(date).getFullYear()
        const month = String(new Date(date).getMonth() + 1).padStart(2, '0')
        const day = String(new Date(date).getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    getWeek(date){
        // Copy date so don't modify original
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
        // Return array of year and week number
        return `WW${weekNo}`;
    }

    judge(val, circle, cross, triangle){
        let j = circle
        if(val === "No Problem"){
            j = circle
        }
        else if(val === "Needs Adjustment"){
            j = triangle
        }
        else{
            j = cross
        }
        return j
    }   
}