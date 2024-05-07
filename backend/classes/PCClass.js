const { rows } = require("mssql")
const pc_model = require("../model/ModelPC")
const pm_model = require("../model/ModelPCPM")
const ExcelJS = require("exceljs")
const fs = require("fs")
const { resolve } = require("path")

module.exports = class PC {
    constructor(item, file){
        this.pc = new pc_model()
        this.pm = new pm_model()
        this.item = item
        this.file = file
        this.workbook = new ExcelJS.Workbook()
    }

    async getPCList(){
        let res = {}
        try{
            let data = await this.pc.getPCList()
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
                res.status = 'error'
                res.message = 'No data found.'
            }
        }
        catch(err){
            res.status = 'error'
            res.message = err.message
        }
        return res
    }

    async getPC(){
        let res ={}
        try{
            let data = await this.pc.getPC(this.item.id)
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
                res.status = 'error'
                res.message = "No data found."
            }
        }
        catch(err){
            res.data = 'error'
            res.message = err.message
        }

        return res
    }

    async addPC(){
        let res = {}

        try{
            const isExist = await this.pc.checkIfExist(this.item.ipAddress, this.item.model)
            if(isExist.length > 0){
                res.status = 'error'
                res.message = 'Data already exist.'
            }
            else{
                const addPCVal = `'${this.item.ipAddress}', '${this.item.model}', '${this.item.serialNo}', '${this.item.name}',
                              '${this.item.warrantyDate}', '${this.item.os}', '${this.item.osKey}', '${this.item.maker}',
                              '${this.item.macAddress}', '${this.item.type}', '${this.item.user}', '${this.item.userIDNo}',
                              '${this.item.email}', '${this.item.area}', '${this.item.department}', 'active', '${this.item.area}'`
                res.status = 'success'
                await this.pc.addPC(addPCVal)
                const getPCIDCondition = `IPAddress = '${this.item.ipAddress}' and Model = '${this.item.model}' and ModelSN = '${this.item.serialNo}' and
                                        PCName = '${this.item.name}' and WarrantyDate = '${this.item.warrantyDate}' and OS = '${this.item.os}' and OSKey = '${this.item.osKey}' and
                                        Maker = '${this.item.maker}' and macAddress = '${this.item.macAddress}' and Type = '${this.item.type}' and Name = '${this.item.user}' and
                                        EmpID = '${this.item.userIDNo}' and Email = '${this.item.email}' and Location = '${this.item.area}' and Department = '${this.item.department}'`
                let newPCID = await this.pc.getPCID(getPCIDCondition)
                res.data = await this.pm.addedPCPMDetails(`'${newPCID[0].ID}', '${this.item.pmDate}', '${this.nextPMDate(this.item.pmDate)}', ''`)
                res.addedID = newPCID
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async updatePC(){
        let res = {}
        try{
            const set = `IPAddress = '${this.item.ipAddress}', Model = '${this.item.model}', ModelSN = '${this.item.serialNo}',
                         PCName = '${this.item.name}', WarrantyDate = '${this.item.warrantyDate}', OS = '${this.item.os}', OSKey = '${this.item.osKey}',
                         Maker = '${this.item.maker}', macAddress = '${this.item.macAddress}', Type = '${this.item.type}', Name = '${this.item.user}',
                         EmpID = '${this.item.userIDNo}', Email = '${this.item.email}', Location = '${this.item.area}', Department = '${this.item.department}'`
            let pcUpdate = await this.pc.updatePC(set, this.item.id)
            const pmSet = `PMDate = '${this.item.pmDate}', LastPMDate = '${this.item.lastPmDate}', NextPMDate = '${this.item.nextPmDate}'`
            res.status = 'success'
            res.data = await this.pm.updatePM(pmSet, this.item.pmID)
        }
        catch(err){
            res.status = 'error'
            res.message = err.message
        }

        return res
    }

    async deletePC(){
        let res ={}
        try{
            await this.pc.deletePC(this.item.id)
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
            const cols = `ActualPMDate = getdate(), InternetAccess = '${this.item.internetAccess}', SoftwareInstalled = '${this.item.softwareInstalled}', VDFUDate = '${this.item.virusUpdate}', VirusScanningRemoval = '${this.item.virusRemoval}', DiskCleanup = '${this.item.diskCleanup}', EmptyRecycleBin = '${this.item.empytRecycleBin}',
                          ClearTemporaryInternetFiles = '${this.item.clearTempFiles}', KeyboardMouseFunctionality = '${this.item.kmMouseFunctionality}', InboxMaintenance = '${this.item.inboxMaintenance}', SpamMailRemoval = '${this.item.spamMailRemoval}', FiveEmailSampling = '${this.item.emailSampling}',
                          BusinessProcessRelated = '${this.item.businessProcessRelated}', Offense = '${this.item.offense}', ChainEmails = '${this.item.chainEmails}', WindowsUpdateDate = '${this.item.windowsUpdate}', PIC = '${this.item.pic}', Remarks = '${this.item.remarks}', Approve = '${this.item.id}.png'`

            const data = await this.pm.submitPM(cols, this.item.id)
            const check = await this.pm.checkNextPM(this.item.pcID)
            if(check[0].ID == this.item.id){
                const pmDate = check[0].NextPMDate
                const lastPMDate = check[0].PMDate
                await this.pm.addedPCPMDetails(`'${this.item.pcID}', '${this.formatDate(pmDate)}', '${this.nextPMDate(this.formatDate(pmDate))}', '${this.formatDate(lastPMDate)}'`)
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

    async pcBar(){
        let res = {}
        try{
            const data = await this.pc.pcBar()
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
            const workbook = new ExcelJS.Workbook()
            const path = "./Template/PCPM.xlsx"
            const excel = fs.realpathSync(path, {encoding: 'utf8'})
            let letters = "GHIJKLMN"
            let sheets = ["13", "14", "15", "17", "18", "20", "21", "22", "24", "26", "27", "28", "29", "30", "31"]
            let user = 0

            await workbook.xlsx.readFile(excel);
            let condition = ``
            this.item.rows.map((id, index) => {
                if(index === this.item.rows.length - 1){
                    condition = `${condition} pm.ID = '${id.pmID}'`
                }
                else{
                    condition = `${condition} pm.ID = '${id.pmID}' or`
                }
            })
            const data = await this.pm.getForCheckListDetails(condition)
            const finish = workbook.addImage({
                filename: fs.realpathSync("./Template/images/finish.png", {encoding: 'utf8'}),
                extension: "png",
            })
            const notApplicable = workbook.addImage({
                filename: fs.realpathSync("./Template/images/notapplicable.png", {encoding: 'utf8'}),
                extension: "png",
            })
            const errorProblem = workbook.addImage({
                filename: fs.realpathSync("./Template/images/errorproblem.png", {encoding: 'utf8'}),
                extension: "png",
            })
            const signature = (id) => {
                return workbook.addImage({
                    filename: fs.realpathSync(`./Template/signature/${id}.png`),
                    extension: "png"
                })
            }
            let rowLength = this.item.rows.length
            let bacthNo = Math.ceil(this.item.rows.length / 8)
            Array.from({length: bacthNo}).map((__, x) => {
                const worksheet = workbook.getWorksheet(`Batch${x + 1}`)
                worksheet.getCell(`D4`).value = this.item.rows[0].area
                worksheet.getCell(`D5`).value = this.formatDate(data[0].PMDate)
                worksheet.getCell(`D6`).value = this.item.pic
                let y = rowLength <= 8 ? rowLength : 8
                Array.from({length: y}).map((_, i) => {
                    worksheet.getCell(`${letters.charAt(i)}10`).value = data[user].IPAddress
                    worksheet.getCell(`${letters.charAt(i)}11`).value = data[user].Name
                    /*-----------------------------System Security---------------------------*/
                    worksheet.getCell(`${letters.charAt(i)}13`).value = data[user].WindowsUpdateDate
                    worksheet.addImage(this.judge(data[user].InternetAccess, finish, notApplicable, errorProblem), `${letters.charAt(i)}14:${letters.charAt(i)}14`)
                    worksheet.addImage(this.judge(data[user].SoftwareInstalled, finish, notApplicable, errorProblem), `${letters.charAt(i)}15:${letters.charAt(i)}15`)
                    /*-----------------------------System Security---------------------------*/
                    worksheet.getCell(`${letters.charAt(i)}17`).value = data[user].VDFUDate
                    worksheet.addImage(this.judge(data[user].VirusScanningRemoval, finish, notApplicable, errorProblem), `${letters.charAt(i)}18:${letters.charAt(i)}18`)
                    /*-------------------------Hard Drive Maintenance------------------------*/
                    worksheet.addImage(this.judge(data[user].DiskCleanup, finish, notApplicable, errorProblem), `${letters.charAt(i)}20:${letters.charAt(i)}20`)
                    worksheet.addImage(this.judge(data[user].EmptyRecycleBin, finish, notApplicable, errorProblem), `${letters.charAt(i)}21:${letters.charAt(i)}21`)
                    worksheet.addImage(this.judge(data[user].ClearTemporaryInternetFiles, finish, notApplicable, errorProblem), `${letters.charAt(i)}22:${letters.charAt(i)}22`)
                    /*-------------------------Hard Drive Performance------------------------*/
                    worksheet.addImage(this.judge(data[user].KeyboardMouseFunctionality, finish, notApplicable, errorProblem), `${letters.charAt(i)}24:${letters.charAt(i)}24`)
                    /*------------------------------Outlook Mail-----------------------------*/
                    worksheet.addImage(this.judge(data[user].InboxMaintenance, finish, notApplicable, errorProblem), `${letters.charAt(i)}26:${letters.charAt(i)}26`)
                    worksheet.addImage(this.judge(data[user].SpamMailRemoval, finish, notApplicable, errorProblem), `${letters.charAt(i)}27:${letters.charAt(i)}27`)
                    worksheet.addImage(this.judge(data[user].FiveEmailSampling, finish, notApplicable, errorProblem), `${letters.charAt(i)}28:${letters.charAt(i)}28`)
                    worksheet.addImage(this.judge(data[user].BusinessProcessRelated, finish, notApplicable, errorProblem), `${letters.charAt(i)}29:${letters.charAt(i)}29`)
                    worksheet.addImage(this.judge(data[user].Offense, finish, notApplicable, errorProblem), `${letters.charAt(i)}30:${letters.charAt(i)}30`)
                    worksheet.addImage(this.judge(data[user].ChainEmails, finish, notApplicable, errorProblem), `${letters.charAt(i)}31:${letters.charAt(i)}31`)
                    worksheet.getCell(`${letters.charAt(i)}32`).value = data[user].PIC
                    if(fs.existsSync(`./Template/signature/${data[user].EmpID}.png`)){
                        worksheet.addImage(signature(data[user].EmpID), `${letters.charAt(i)}33:${letters.charAt(i)}33`)
                    }
                    user++
                })
                rowLength = rowLength - y
            })
            const fileName = `${this.item.date}_${this.item.rows[0].area}.xlsx`
            await workbook.xlsx.writeFile(`./public/generated/pc/${fileName}`);
            res.status = "success"
            res.data = `pc/${fileName}`
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async import(){
        let res = {}
        const workbook = new ExcelJS.Workbook()
        const path = `./imports/${this.file.originalname}`
        const excel = fs.realpathSync(path, {encoding: 'utf8'})
        let columns = []
        let values = []
        await workbook.xlsx.readFile(excel);
        const worksheet = workbook.getWorksheet('ITPMS')
        worksheet.eachRow({ includeEmpty: true, range: 'A1:Z1' }, (row, rowNumber) => {
            let tempValues = []
            if(rowNumber === 1){
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    if(colNumber < 29){
                        columns.push(cell.value)
                    }
                    
                });
            }
            else{
                tempValues = []
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    if(colNumber < 29 && row.getCell(3).value !== null && row.getCell(3).value != ""){
                        tempValues.push(cell.value)
                    }
                });
                tempValues.length > 0 &&  values.push(tempValues)
            }
        });
        console.log(columns)
        console.log(values[values.length - 1])
        // try{
            
        // }
        // catch(err){
        //     res.status = "error"
        //     res.message = err.message
        // }
        
        return res
    }

    nextPMDate(dateStr){
        const date = new Date(dateStr)
        let nextPM = new Date()
        date.setMonth(date.getMonth() + 3)
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

    judge(val, circle, cross, triangle){
        let j = circle
        if(val === "Finish"){
            j = circle
        }
        else if(val === "Error/Problem"){
            j = triangle
        }
        else{
            j = cross
        }
        return j
    }   

}