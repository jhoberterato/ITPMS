const model = require("./model")

class ModelPC extends model {
    constructor(){
        super('tblPC')
    }

    async getPCList(){
        const cols = 'ID, IPAddress, Model, Name, Location, Department'
        const condition = "(Status = 'active' or Status = 'Active') and (not(Area is null)) and (not(department is null)) and (Type = 'Laptop' or Type = 'Tablet' or Type = 'Desktop' or Type = 'Server') and Model <> '' and (not(Model is null))"
        return this.selectLimWhere(cols, condition)
    }

    async addPC(values){
        const cols = "IPAddress, Model, ModelSN, PCName, WarrantyDate, OS, OSKey, Maker, macAddress, Type, Name, EmpID, Email, Location, Department, Status, Area"
        return this.insert(cols, values)
    }

    async getPCID(condition){
        return this.selectLimWhere('ID', condition)
    }

    async checkIfExist(ip, model){
        return this.select(`IPAddress = '${ip}' and Model = '${model}'`)
    }

    async getPC(id){
        const cols = "ID, IPAddress, Model, ModelSN, PCName, WarrantyDate, OS, case when OSKey is null then '' else OSKey end as OSKey , Maker, case when macAddress is null then '' else macAddress end as macAddress, Type, Name, EmpID, Email, Location, Department, Status, Area"
        const condition = `ID = '${id}'`
        return this.selectLimWhere(cols, condition)
    }

    async updatePC(set, id){
        return this.update(set, `ID = '${id}'`)
    }

    async deletePC(id){
        return this.delete(`ID = '${id}'`)
    }

    async pcBar(){
        const cols = `Department as department,
                      sum(case when Type = 'Server' then 1 else 0 end) as server, 'hsl(295, 70%, 50%)' as serverColor,
                      sum(case when Type = 'Desktop' then 1 else 0 end) as desktop, 'hsl(296, 70%, 50%)' as desktopColor,
                      sum(case when Type = 'Laptop' then 1 else 0 end) as laptop, 'hsl(97, 70%, 50%)' as laptopColor,
                      sum(case when Type = 'Tablet' then 1 else 0 end) as tablet, 'hsl(340, 70%, 50%)' as tabletColor`
        const condition = `(Status = 'active' or Status = 'Active') and (not(Area is null)) and (not(department is null)) and (Type = 'Laptop' or Type = 'Tablet' or Type = 'Desktop' or Type = 'Server') and Model <> '' and (not(Model is null))
                            group by Department`
        return this.selectLimWhere(cols, condition)
    }

    async import(cols, vals){
        return this.insert(cols, vals) 
    }
}

module.exports = ModelPC