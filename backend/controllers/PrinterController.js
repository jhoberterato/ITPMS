const printerClass = require("../classes/PrinterClass")

module.exports = {
    async getPrinterList(req, res){
        let printer_class = new printerClass(req.body)
        let getList = await printer_class.getPrinterList()
        res.send(getList)
    },

    async addPrinter(req, res){
        let printer_class = new printerClass(req.body)
        let add = await printer_class.addPrinter()
        res.send(add)
    },

    async getPrinter(req, res){
        let printer_class = new printerClass(req.body)
        let getPrinter = await printer_class.getPrinter()
        res.send(getPrinter)
    },

    async updatePrinter(req, res){
        let printer_class = new printerClass(req.body)
        let update = await printer_class.updatePrinter()
        res.send(update)
    },

    async deletePrinter(req, res){
        let printer_class = new printerClass(req.body)
        let del = await printer_class.deletePrinter()
        res.send(del)
    },

    async getAllPMSchedule(req, res){
        let printer_class = new printerClass(req.body)
        let pmSched = await printer_class.getAllPMSchedule()
        res.send(pmSched)
    },

    async getFinishedPM(req, res){
        let printer_class = new printerClass(req.body)
        let finsihedPM = await printer_class.getFinishedPM()
        res.send(finsihedPM)
    },

    async getPMSchedByDate(req, res){
        let printer_class = new printerClass(req.body)
        let schedByDate = await printer_class.getPMSchedByDate()
        res.send(schedByDate)
    },

    async getForPMList(req, res){
        let printer_class = new printerClass(req.body)
        let pmList = await printer_class.getForPMList()
        res.send(pmList)
    },

    async getForPMDetails(req, res){
        let printer_class = new printerClass(req.body)
        let pmDetails = await printer_class.getForPMDetails()
        res.send(pmDetails)
    },

    async getLabelDetails(req, res){
        let printer_class = new printerClass(req.body)
        let labelDetails = await printer_class.getLabelDetails()
        res.send(labelDetails)
    },

    async submitPM(req, res){
        let printer_class = new printerClass(req.body)
        let pm = await printer_class.submitPM()
        res.send(pm)
    },

    async printerPie(req, res){
        let printer_class = new printerClass(req.body)
        let pie = await printer_class.printerPie()
        res.send(pie)
    },

    async getRecentPM(req, res){
        let printer_class = new printerClass(req.body)
        let recent = await printer_class.getRecentPM()
        res.send(recent)
    },

    async countPM(req, res){
        let printer_class = new printerClass(req.body)
        let pm = await printer_class.countPM()
        res.send(pm)
    },

    async printChecklist(req, res){
        let printer_class = new printerClass(req.body)
        let checklist = await printer_class.printChecklist()
        res.send(checklist)
    }

}