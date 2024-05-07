const express = require('express')
const router = express.Router()

const loginController = require('../controllers/LoginController')
const pcController = require("../controllers/PCController")
const printerController = require("../controllers/PrinterController")
const equipmentController = require("../controllers/EquipmentController")
const downloadController = require("../controllers/DownloadController")

/*--------------User-----------*/
router.post('/api/login', loginController.login)
router.post('/api/decUser', loginController.decUser)

/*--------------PC--------------*/
router.post('/api/pc/getPCList', pcController.getPCList)
router.post('/api/pc/getPC', pcController.getPC)
router.post('/api/pc/addPC', pcController.addPC)
router.post('/api/pc/updatePC', pcController.updatePC)
router.post('/api/pc/deletePC', pcController.deletePC)
router.post('/api/pc/getAllPMSchedule', pcController.getAllPMSchedule)
router.post('/api/pc/getFinishedPM', pcController.getFinishedPM)
router.post('/api/pc/getPMSchedByDate', pcController.getPMSchedByDate)
router.post('/api/pc/getForPMList', pcController.getForPMList)
router.post('/api/pc/getForPMDetails', pcController.getForPMDetails)
router.post('/api/pc/submitPM', pcController.submitPM)
router.post('/api/pc/getLabelDetails', pcController.getLabelDetails)
router.post('/api/pc/pcBar', pcController.pcBar)
router.post('/api/pc/getRecentPM', pcController.getRecentPM)
router.post('/api/pc/countPM', pcController.countPM)
router.post('/api/pc/printChecklist', pcController.printChecklist)
router.post('/api/pc/importPC', pcController.import)

/*------------Printer-----------*/
router.post('/api/printer/getPrinterList', printerController.getPrinterList)
router.post('/api/printer/getPrinter', printerController.getPrinter)
router.post('/api/printer/addPrinter', printerController.addPrinter)
router.post('/api/printer/updatePrinter', printerController.updatePrinter)
router.post('/api/printer/deletePrinter', printerController.deletePrinter)
router.post('/api/printer/getAllPMSchedule', printerController.getAllPMSchedule)
router.post('/api/printer/getFinishedPM', printerController.getFinishedPM)
router.post('/api/printer/getPMSchedByDate', printerController.getPMSchedByDate)
router.post('/api/printer/getForPMList', printerController.getForPMList)
router.post('/api/printer/getForPMDetails', printerController.getForPMDetails)
router.post('/api/printer/submitPM', printerController.submitPM)
router.post('/api/printer/printerPie', printerController.printerPie)
router.post('/api/printer/getLabelDetails', printerController.getLabelDetails)
router.post('/api/printer/getRecentPM', printerController.getRecentPM)
router.post('/api/printer/countPM', printerController.countPM)
router.post('/api/printer/printChecklist', printerController.printChecklist)

/*------------Equipment-----------*/
router.post('/api/equipment/equipmentLine', equipmentController.equipmentLine)
router.post('/api/equipment/getTypes', equipmentController.getTypes)
router.post('/api/equipment/countAll', equipmentController.countAll)
router.post('/api/equipment/getNotifications', equipmentController.getNotifications)

/*-------------Download-----------*/
router.get('/api/download', downloadController.downloadFile)

module.exports = router