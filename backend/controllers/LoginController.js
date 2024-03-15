const loginClass = require("../classes/LoginClass")
const emailClass = require("../classes/EmailClass")

module.exports = {
    async login(req, res){
        let login_class = new loginClass(req.body)
        let login = await login_class.login()
        res.send(login)
    },

    async decUser(req, res){
        let login_class = new loginClass(req.body)
        let decUser = await login_class.decUser()
        res.send(decUser.decode)
    },

    async authentication(req, res){
        console.log(req.cookies.login_auth)
        res.send(req.cookies.login_auth);
    },

    async userData(req, res){
        let login_class = new loginClass(req.body)
        
        res.send(req.session.token)
    }
}