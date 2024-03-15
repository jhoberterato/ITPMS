const model = require("./model")

class ModelPrinterPM extends model{
    constructor(){
        super("tblPrinterPMSched")
    }

    async getPMDetails(printerID){
        const cols = `top(2) ID, PrinterID, PMDate, NextPMDate, ActualPMDate, LastPMDate, PIC`
        const condition = `PrinterID = '${printerID}' order by PMDate desc`
        return this.selectLimWhere(cols, condition)
    }

    async addPrinterPMDetails(values){
        return this.insert("PrinterID, PMDate, NextPMDate", values)
    }

    async updatePM(set, id){
        return this.update(set, `ID = '${id}'`)
    }

    async deletePM(printerID){
        return this.delete(`PrinterID = '${printerID}'`)
    }

    async getAllPMSchedule(){
        const cols = "COUNT(*) AS Count, PMDate, CASE WHEN PMDate < GETDATE() THEN 'Late PM' ELSE 'For PM' END AS Category"
        const condition = "(PIC IS NULL) GROUP BY PMDate, CASE WHEN PMDate < GETDATE() THEN 'Late PM' ELSE 'For PM' END ORDER BY PMDate DESC"
        return this.selectLimWhere(cols, condition)
    }

    async getFinishedPM(){
        const col = "COUNT(*) AS Count, PMDate, 'Finished' AS Category"
        const condition = "(NOT (PIC IS NULL)) GROUP BY PMDate ORDER BY PMDate DESC"
        return this.selectLimWhere(col, condition)
    }

    async getPMSchedByDep(date, condition){
        
        let sql = `select count(*) as Count, case when printer.Location is null then '' else printer.Location end as Location
                   from tblPrinters as printer
                   inner join tblPrinterPMSched as pm on printer.ID = pm.PrinterID
                   where pm.PMDate = '${date}' and ${condition}
                   group by Location`
        return this.custom(sql)
    }

    async getForPMList(date, location, category){
        let pic = category === "Finished" ? 'not(pm.PIC is null)' : 'pm.PIC is null'
        let sql = `select printer.ID, printer.Location, printer.Model, pm.PIC, pm.ID as PMID, case when pm.PIC is null then 'For PM' else 'Done' end as Status, printer.SerialNumber, pm.NextPMDate, pm.PMDate
                   from tblPrinters as printer
                   inner join tblPrinterPMSched as pm on printer.ID = pm.PrinterID
                   where pm.PMDate = '${date}' and printer.Location = '${location}' and ${pic}`
        return this.custom(sql)
    }

    async getForPMDetails(id){
        return this.select(`ID = '${id}'`)
    }

    async getLabelDetails(printerID, pmDate, location){
        let sql = `select printer.Model, printer.SerialNumber, pm.PMDate, pm.NextPMDate, pm.PIC, printer.Location
                   from tblPrinters as printer inner join tblPrinterPMSched as pm on printer.ID = pm.PrinterID
                   where printer.ID = '${printerID}' and pm.PMDate = '${pmDate}' and printer.Location = '${location}'`
        return this.custom(sql)
    }

    async submitPM(cols, id){
        return this.update(cols, `ID = '${id}'`)
    }

    async checkNextPM(printerid){
        return this.select(`PrinterID = '${printerid}' order by ID desc`)
    }

    async getRecentPM(){
        let sql = `select top 10 printer.Model, printer.Location, pm.PMDate, pm.PIC
                   from tblPrinterPMSched as pm inner join tblPrinters as printer
                   on pm.PrinterID = printer.ID
                   where not(pm.PIC is null)
                   order by pm.ID desc`
        return this.custom(sql)
    }

    async countPM(){
        let cols = `sum(case when PMDate >= GETDATE() and PIC is null then 1 else 0 end) as ForPM,
                    sum(case when PMDate < GETDATE() and PIC is null then 1 else 0 end) as LatePM,
                    sum(1) as AllCount`
        let condition = `PIC is null`
        return this.selectLimWhere(cols, condition)
    }

    async getForCheckListDetails(printerID){
        let sql = `
            select printer.Model, printer.SerialNumber, printer.Location, pm.*
            from tblPrinterPMSched as pm inner join tblPrinters as printer
            on pm.PrinterID = printer.ID
            where pm.ID = '${printerID}'
        `
        return this.custom(sql)
    }
}

module.exports = ModelPrinterPM