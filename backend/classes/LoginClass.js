const model_login = require("../model/ModelLogin")
const jwt = require("jsonwebtoken")

module.exports = class Login {
    constructor(item){
        this.m_login = new model_login()
        this.item = item
    }

    async login(){
        let res = {}
        try{
            let data = await this.m_login.login(this.item.pin, this.item.password)
            if(data.length > 0){
                res.status = "success"
                res.data = jwt.sign(data[0], 'getUser')
                //res.decode = jwt.verify(res.token, 'test')
            } else{
                res.status = "error"
            }  
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }

    async decUser(){
        let res = {}
        try{
            res.decode = jwt.verify(this.item.token, 'getUser')
        }
        catch(err){
            res.status = "error"
            res.message = err.message
        }

        return res
    }
}