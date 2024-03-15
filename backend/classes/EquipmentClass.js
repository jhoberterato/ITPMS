const equipment_model = require("../model/ModelEquipment")

module.exports = class Equipment{
    constructor(item){
        this.equipment = new equipment_model()
        this.item = item
    }

    async getTypes(){
        let res = {}
        try{
            const data = await this.equipment.getDistinctType()
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

    async equipmentLine(){
        let res = {}
        try{
            const type = await this.equipment.getDistinctType()
            if(type.length > 0){
                let sql = 'Department, '
                type.map(type => {
                    sql = sql.concat(`sum(case when Type like '%${type.Type}%' then 1 else 0 end) as ${type.Type.replace(/\s+/g, "")},`)
                })
                const data = await this.equipment.equipmentLine(sql.slice(0, -1))
                if(data.length > 0){
                    res.status = "success"
                    res.data = data
                }
                else{
                    res.status = "error"
                    res.message = "No data found."
                }
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

    async countAll(){
        let res = {}
        try{
            const data = await this.equipment.countAll()
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

    async getNotifications(){
        let res = {}
        try{
            const pc = await this.equipment.getForPCEmail()
            const printer =  await this.equipment.getForPrinterEmail()
            res.status = "success"
            res.data = {pc: pc, printer: printer}
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }
}