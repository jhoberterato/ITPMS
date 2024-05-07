const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const routes = require('./routes')
const emailClass = require("./classes/EmailClass")

app.use(cors({origin: true, credentials: true}))

app.use(cookieParser("bulanglangnapatani"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/sign', express.static(__dirname + '/signature'))
app.use('/imports', express.static(__dirname + '/imports'))
app.use('/generated', express.static(__dirname + '/public/generated'))
app.use('', routes)

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
    }
    const infinite = () => {
        sendEmail()
        setTimeout(infinite, 1000)
    }
    infinite()
})