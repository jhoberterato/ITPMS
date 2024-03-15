const model = require("./model")

class ModelPCPM extends model {
    constructor(){
        super('tblPCPMSched')
    }

    async getPMDetails(pcid){
        const cols = 'top (2) ID, PCID, PMDate, NextPMDate, ActualPMDate, LastPMDate, PIC'
        const condition = `PCID = '${pcid}' order by PMDate desc`
        return this.selectLimWhere(cols, condition)
    }

    async addedPCPMDetails(values){
        return this.insert('PCID, PMDate, NextPMDate, LastPMDate', values)
    }

    async updatePM(set, id){
        return this.update(set, `ID = '${id}'`)
    }

    async deletePM(pcid){
        return this.delete(`PCID = '${pcid}'`)
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
        
        let sql = `select count(*) as Count, case when pc.Location is null then '' else pc.Location end as Location
                    from tblPC as pc 
                    inner join tblPCPMSched as pm on pc.ID = pm.PCID
                    where pm.PMDate = '${date}' and ${condition}
                    group by Location`
        return this.custom(sql)
    }

    async getForPMList(date, location, category){
        let pic = category === "Finished" ? 'not(pm.PIC is null)' : 'pm.PIC is null'
        let sql = `select pc.ID, pc.IPAddress, pc.Location, pc.Name, pm.PIC, pm.ID as PMID, case when pm.PIC is null then 'For PM' else 'Done' end as Status, pc.ModelSN, pm.NextPMDate, pc.PCName, pm.PMDate
                   from tblPC as pc 
                   inner join tblPCPMSched as pm on pc.ID = pm.PCID
                   where pm.PMDate = '${date}' and pc.Location = '${location}' and ${pic}`
        return this.custom(sql)
    }

    async getForPMDetails(id){
        return this.select(`ID = '${id}'`)
    }

    async getLabelDetails(pcID, pmDate, location){
        let sql = `select pc.IPAddress, pc.PCName, pm.PMDate, pm.NextPMDate, pc.ModelSN, pc.Location, pm.PIC
                   from tblPC as pc inner join tblPCPMSched as pm on pc.ID = pm.PCID
                   where pc.ID = '${pcID}' and pm.PMDate = '${pmDate}' and pc.Location = '${location}'`
        return this.custom(sql)
    }

    async submitPM(cols, id){
        return this.update(cols, `ID = '${id}'`)
    }

    async checkNextPM(pcid){
        return this.select(`PCID = '${pcid}' order by ID desc`)
    }

    async getRecentPM(){
        let sql = `select top 10 pc.Model, pc.IPAddress, pm.PMDate, pm.PIC
                   from tblPC as pc inner join tblPCPMSched as pm
                   on pc.ID = pm.PCID
                   where not(pm.PIC is null)
                   order by pm.ID desc
                  `
        return this.custom(sql)
    }

    async countPM(){
        let cols = `sum(case when PMDate >= GETDATE() and PIC is null then 1 else 0 end) as ForPM,
                    sum(case when PMDate < GETDATE() and PIC is null then 1 else 0 end) as LatePM,
                    sum(1) as AllCount`
        let condition = `PIC is null`
        return this.selectLimWhere(cols, condition)
    }

    async getForCheckListDetails(condition){
        let sql = `
            select pm.*, pc.IPAddress, pc.Name, pc.EmpID
            from tblPCPMSched as pm inner join tblPC as pc on pm.PCID = pc.ID
            where ${condition}
        `
        return this.custom(sql)
    }
}

module.exports = ModelPCPM