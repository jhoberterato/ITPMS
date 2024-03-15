const equipmentClass = require("../classes/EquipmentClass")

module.exports = {
    async equipmentLine(req, res){
        let equipment_class = new equipmentClass(req.body)
        let line = await equipment_class.equipmentLine()
        res.send(line)
    },

    async getTypes(req, res){
        let equipment_class = new equipmentClass(req.body)
        let types = await equipment_class.getTypes()
        res.send(types)
    },

    async countAll(req, res){
        let equipment_class = new equipmentClass(req.body)
        let count = await equipment_class.countAll()
        res.send(count)
    },

    async getNotifications(req, res){
        let equipment_class = new equipmentClass(req.body)
        let notif = await equipment_class.getNotifications()
        res.send(notif)
    }
}