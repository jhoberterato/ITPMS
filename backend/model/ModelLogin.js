const model = require("./model")

class ModelLogin extends model{
    constructor(){
        super('viewITPMSEmpInfo')
    }

    async login(pin, password){
        return this.selectLimWhere('LastName, FirstName, DepartmentCode, DepartmentName, Name', `PIN = '${pin}' and Password = '${password}'`)
    }
}

module.exports = ModelLogin 