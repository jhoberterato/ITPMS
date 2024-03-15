const multer = require("multer")

const signatureAttachment = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./signature")
    },
    filename: function(req, file, cb){
        let ext = `${req.body.id}.png`
        cb(null, ext)
    }
})

let sign = multer({storage: signatureAttachment}).single("file")

module.exports = sign