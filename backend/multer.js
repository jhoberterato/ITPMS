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

const importPC = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imports')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

let sign = multer({storage: signatureAttachment}).single("file")
let pcImport = multer({storage: importPC}).single("file")

module.exports = { sign, pcImport}