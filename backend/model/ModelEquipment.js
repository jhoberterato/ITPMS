const model = require("./model")

class ModelEquipment extends model {
    constructor(){
        super('tblPC')
    }

    async getDistinctType(){
        return this.selectLimWhere('distinct Type', 'not (Type is null)')
    }

    async equipmentLine(cols){
        return this.selectLimWhere(cols, `not(Department is null) group by Department`)
    }

    async countAll(){
        return this.selectNoWhere('count(*) as Count')
    }

    async getForPCEmail(){
        const sql = `select pc.IPAddress, pc.Model, pm.PMDate, pc.Type,
                   case when pm.PMDate > GETDATE() then 'For PM' else 'Late PM' end as Status
                   from tblPCPMSched_old as pm
                   inner join tblPC as pc on pm.PCID = pc.ID
                   where pm.PIC is null  and pm.PMDate <= DATEADD(month, 1, GETDATE())`
        return this.custom(sql)
    }

    async getForPrinterEmail(){
        const sql = `select printer.Location, printer.Model, pm.PMDate,
                   case when pm.PMDate > GETDATE() then 'For PM' else 'Late PM' end as Status
                   from tblPrinterPMSched as pm
                   inner join tblPrinters as printer on pm.PrinterID = printer.ID
                   where pm.PIC is null  and pm.PMDate <= DATEADD(month, 1, GETDATE())`
        return this.custom(sql)
    }
}

module.exports = ModelEquipment