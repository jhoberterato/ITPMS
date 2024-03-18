const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const nodemailer = require('nodemailer')
const dotenv = require("dotenv").config()

/*--------------Email Sending-----------*/
const transporter = nodemailer.createTransport({
    host: 'outlook.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'admin-system@nmc-net.com',
        pass: '@dm!n5ys'
    }
})

const emailClass = require("./classes/EmailClass")

const loginController = require('./controllers/LoginController')
const pcController = require("./controllers/PCController")
const printerController = require("./controllers/PrinterController")
const equipmentController = require("./controllers/EquipmentController")
const downloadController = require("./controllers/DownloadController")
const session = require("express-session")


app.use(cors({origin: true, credentials: true}))

app.use(cookieParser("bulanglangnapatani"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/sign', express.static(__dirname + '/signature'))
app.use('/generated', express.static(__dirname + '/public/generated'))


/*--------------User-----------*/
app.post('/api/login', loginController.login)
app.post('/api/decUser', loginController.decUser)

/*--------------PC--------------*/
app.post('/api/pc/getPCList', pcController.getPCList)
app.post('/api/pc/getPC', pcController.getPC)
app.post('/api/pc/addPC', pcController.addPC)
app.post('/api/pc/updatePC', pcController.updatePC)
app.post('/api/pc/deletePC', pcController.deletePC)
app.post('/api/pc/getAllPMSchedule', pcController.getAllPMSchedule)
app.post('/api/pc/getFinishedPM', pcController.getFinishedPM)
app.post('/api/pc/getPMSchedByDate', pcController.getPMSchedByDate)
app.post('/api/pc/getForPMList', pcController.getForPMList)
app.post('/api/pc/getForPMDetails', pcController.getForPMDetails)
app.post('/api/pc/submitPM', pcController.submitPM)
app.post('/api/pc/getLabelDetails', pcController.getLabelDetails)
app.post('/api/pc/pcBar', pcController.pcBar)
app.post('/api/pc/getRecentPM', pcController.getRecentPM)
app.post('/api/pc/countPM', pcController.countPM)
app.post('/api/pc/printChecklist', pcController.printChecklist)

/*------------Printer-----------*/
app.post('/api/printer/getPrinterList', printerController.getPrinterList)
app.post('/api/printer/getPrinter', printerController.getPrinter)
app.post('/api/printer/addPrinter', printerController.addPrinter)
app.post('/api/printer/updatePrinter', printerController.updatePrinter)
app.post('/api/printer/deletePrinter', printerController.deletePrinter)
app.post('/api/printer/getAllPMSchedule', printerController.getAllPMSchedule)
app.post('/api/printer/getFinishedPM', printerController.getFinishedPM)
app.post('/api/printer/getPMSchedByDate', printerController.getPMSchedByDate)
app.post('/api/printer/getForPMList', printerController.getForPMList)
app.post('/api/printer/getForPMDetails', printerController.getForPMDetails)
app.post('/api/printer/submitPM', printerController.submitPM)
app.post('/api/printer/printerPie', printerController.printerPie)
app.post('/api/printer/getLabelDetails', printerController.getLabelDetails)
app.post('/api/printer/getRecentPM', printerController.getRecentPM)
app.post('/api/printer/countPM', printerController.countPM)
app.post('/api/printer/printChecklist', printerController.printChecklist)

/*------------Equipment-----------*/
app.post('/api/equipment/equipmentLine', equipmentController.equipmentLine)
app.post('/api/equipment/getTypes', equipmentController.getTypes)
app.post('/api/equipment/countAll', equipmentController.countAll)
app.post('/api/equipment/getNotifications', equipmentController.getNotifications)

/*-------------Download-----------*/
app.get('/api/download', downloadController.downloadFile)

app.listen(4010, (err) => {
    console.log(err ? `Error: ${err}` : "Running on port 4010") 
    
    const sendEmail = async () => {
        const email = new emailClass()
        const currentHour = new Date().getHours()
        const currentMinutes = new Date().getMinutes()
        const currentSeconds = new Date().getSeconds()
        if(currentHour === 8 && currentMinutes === 0 && currentSeconds === 0){
            console.log("Oras na!!!")
            await email.sendMail().catch(error => console.log(error))
        }
        else{
            //console.log(await email.test())
            //console.log("Hindi pa oras !!!")
        }
    }
    const infinite = () => {
        //console.log('test')
        sendEmail()
        setTimeout(infinite, 1000)
    }
    infinite()
})