const model = require("./model")

class ModelPrinter extends model {
    constructor(){
        super("tblPrinters")
    }

    async getPrinterList(){
        return this.selectAll()
    }

    async addPrinter(values){
        const cols = "Model, SerialNumber, Location"
        return this.insert(cols, values)
    }

    async getPrinterID(condition){
        return this.selectLimWhere('ID', condition)
    }

    async getPrinter(id){
        const cols = `ID, Model, SerialNumber, Location`
        const condition = `ID = '${id}'`
        return this.selectLimWhere(cols, condition)
    }

    async checkIfExist(model, serial){
        return this.select(`Model = '${model}' and SerialNumber = '${serial}'`)
    }

    async updatePrinter(set, id){
        return this.update(set, `ID = '${id}'`)
    }

    async deletePrinter(id){
        return this.delete(`ID = '${id}'`)
    }

    async printerPie(){
        const cols = `sum(case when Model like '%brother%' then 1 else 0 end) as Brother,
                sum(case when Model like '%epson%' then 1 else 0 end) as Epson,
                sum(case when Model like '%sato%' then 1 else 0 end) as Sato,
                sum(case when Model not like '%brother%' and Model not like '%epson%' and Model not like '%sato%' then 1 else 0 end) as Other
            `
        return this.selectNoWhere(cols)
    }
}

module.exports = ModelPrinter