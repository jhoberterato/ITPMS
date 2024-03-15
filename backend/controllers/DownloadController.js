module.exports = {
    async downloadFile(req, res){
        let filename = req.query.file;
        res.download(`./public/generated/${filename}`, filename);
    }
}