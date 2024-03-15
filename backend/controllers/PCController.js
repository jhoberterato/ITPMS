const pcClass = require("../classes/PCClass")
const sign = require("./../multer")

module.exports = {
    async getPCList(req, res){
        let pc_class = new pcClass(req.body)
        let getList = await pc_class.getPCList()
        res.send(getList)
    },

    async addPC(req, res){
        let pc_class = new pcClass(req.body)
        let add = await pc_class.addPC()
        res.send(add)
    },

    async getPC(req, res){
        let pc_class = new pcClass(req.body)
        let getPC = await pc_class.getPC()
        res.send(getPC)
    },

    async updatePC(req, res){
        let pc_class = new pcClass(req.body)
        let update = await pc_class.updatePC()
        res.send(update)
    },

    async deletePC(req, res){
        let pc_class = new pcClass(req.body)
        let del = await pc_class.deletePC()
        res.send(del)
    },

    async getAllPMSchedule(req, res){
        let pc_class = new pcClass(req.body)
        let pmSched = await pc_class.getAllPMSchedule()
        res.send(pmSched)
    },

    async getFinishedPM(req, res){
        let pc_class = new pcClass(req.body)
        let finsihedPM = await pc_class.getFinishedPM()
        res.send(finsihedPM)
    },

    async getPMSchedByDate(req, res){
        let pc_class = new pcClass(req.body)
        let schedByDate = await pc_class.getPMSchedByDate()
        res.send(schedByDate)
    },

    async getForPMList(req, res){
        let pc_class = new pcClass(req.body)
        let pmList = await pc_class.getForPMList()
        res.send(pmList)
    },

    async getForPMDetails(req, res){
        let pc_class = new pcClass(req.body)
        let pmDetails = await pc_class.getForPMDetails()
        res.send(pmDetails)
    },

    async getLabelDetails(req, res){
        let pc_class = new pcClass(req.body)
        let labelDetails = await pc_class.getLabelDetails()
        res.send(labelDetails)
    },

    async submitPM(req, res){
        sign(req, res, async (err) => {
            //console.log(req.body)
            //console.log(req.file)
            let pc_class = new pcClass(req.body)
            let pm = await pc_class.submitPM()
            res.send(pm)
        })
    },

    async pcBar(req, res){
        let pc_class = new pcClass(req.body)
        let bar = await pc_class.pcBar()
        res.send(bar)
    },

    async getRecentPM(req, res){
        let pc_class = new pcClass(req.body)
        let recent = await pc_class.getRecentPM()
        res.send(recent)
    },

    async countPM(req, res){
        let pc_class = new pcClass(req.body)
        let pm = await pc_class.countPM()
        res.send(pm)
    },

    async printChecklist(req, res){
        let pc_class = new pcClass(req.body)
        let checklist = await pc_class.printChecklist()
        res.send(checklist)
    }
}