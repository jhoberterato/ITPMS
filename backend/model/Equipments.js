const Model = require('./model')

class Equipments extends Model{
    constructor(){
        super('tblEquipmetList')
    }

    async import(cols, vals){
        return this.insert(cols.join(', '), vals.join(', '))
    }
}

module.exports = Equipments