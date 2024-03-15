const equipment_model = require("../model/ModelEquipment")
const nodemailer = require("nodemailer")

module.exports = class Emailss{
    constructor(){
        this.equipment = new equipment_model()
        this.transporter = nodemailer.createTransport({
            host: 'outlook.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'admin-system@nmc-net.com',
                pass: '@dm!n5ys'
            }
        })
    }

    html(pcData, printerData){
        let pc = ''
        let printer = ''
        if(pcData.data.length > 0){
            pc = `
                <h3>PC/Laptop</h3>
                <table id="tbl">
                    <tr>
                        <th>IP Address</th>
                        <th>Model</thead>
                        <th>PM Date</th>
                        <th>Status</th>
                    </tr>`
            pcData.data.map(d => {
                const year = new Date(d.PMDate).getFullYear()
                const month = String(new Date(d.PMDate).getMonth() + 1).padStart(2, '0')
                const day = String(new Date(d.PMDate).getDate()).padStart(2, '0')
                pc = `
                        ${pc}
                        <tr>
                            <td>${d.IPAddress}</td>
                            <td>${d.Model}</td>
                            <td>${year}-${month}-${day}</td>
                            <td>${d.Status}</td>
                        </tr>
                    `
            })
            pc = `${pc} </table><br>`
        }
        if(printerData.data.length > 0){
            printer = `
                <h3>Printer</h3>
                <table id="tbl">
                    <tr>
                        <th>Location</th>
                        <th>Model</thead>
                        <th>PM Date</th>
                        <th>Status</th>
                    </tr>`
            printerData.data.map(d => {
                const year = new Date(d.PMDate).getFullYear()
                const month = String(new Date(d.PMDate).getMonth() + 1).padStart(2, '0')
                const day = String(new Date(d.PMDate).getDate()).padStart(2, '0')
                printer = `
                        ${printer}
                        <tr>
                            <td>${d.Location}</td>
                            <td>${d.Model}</td>
                            <td>${year}-${month}-${day}</td>
                            <td>${d.Status}</td>
                        </tr>
                    `
            })
            printer = `${printer} </table>`
        }
        let tag = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <style>
                    body{
                        background: #fcfcfc;
                        font-family: Arial, Helvetica, sans-serif;
                        margin: 0;
                    }
                    #parent{
                        position: relative;
                    }
                    #tbl{
                        border-collapse: collapse;
                        width: 100%;
                    }
                    .tblDiv{
                        width: 50%;
                        margin-top: 50px;
                    }
                    #tbl td, #tbl th{
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    .rotate:hover {
                        transform: rotateY(40deg);
                    }
                </style>
                <body>
                    <div id="parent">
                        <p>Dear Team,</p>
                        <p>Good day! Please refer to the PM schedule below.</p>
                        <div class="tblDiv">
                            ${pc}
                            ${printer}
                        </div>
                        <br>
                        <br>
                        <br>
                        <p>This is a system generated, please do not reply.</p>
                    </div>
                    
                </body>
            </html>
        `
        return tag
    }

    async sendMail(){
        try{
            const pc = await this.getForPCEmail()
            const printer = await this.getForPrinterEmail()
            if(pc.status === "success" || printer.status === "success"){
                if(pc.data.length > 0 || printer.data.length > 0){
                    await this.transporter.sendMail({
                        from: '"ITPMS Mailer" <admin-system@nmc-net.com>',
                        to: 'nmcp-systems@nmc-net.com',
                        subject: 'ITPMS PM Notification',
                        text: 'ITPMS PM Notification',
                        html: this.html(pc, printer)
                    })
                }
            }
        }
        catch(err){
            console.log(err.message)
        }
        
    }


    async getForPCEmail(){
        let res = {}

        try{
            const data = await this.equipment.getForPCEmail()
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async getForPrinterEmail(){
        let res = {}

        try{
            const data = await this.equipment.getForPrinterEmail()
            if(data.length > 0){
                res.status = "success"
                res.data = data
            }
            else{
                res.status = "error"
                res.message = "No data found."
            }
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }
}