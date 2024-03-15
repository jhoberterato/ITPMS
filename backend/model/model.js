const sql = require("../config")

module.exports = class Model {
    constructor(table){
        this.table = table
        this.request = sql.request
    }

    async select(condition){
        const table = this.table
        let res = await this.request.query(`select * from ${table} where ${condition}`)
        return res.recordset
    }

    async selectNoWhere(cols){
        let res = await this.request.query(`select ${cols} from ${this.table}`)
        return res.recordset
    }

    async selectLimWhere(columns, condition){
        const table = this.table
        let res = await this.request.query(`select ${columns} from ${table} where ${condition}`)
        return res.recordset
    }
    
    async selectAll(){
        const table = this.table
        let res = await this.request.query(`select * from ${table}`)
        return res.recordset
    }

    async insert(columns, values){
        const table = this.table
        console.log(`insert into ${table}(${columns}) values(${values})`)
        let res = await this.request.query(`insert into ${table}(${columns}) values(${values})`)
        return res
    }

    async update(set, condition){
        let res = await this.request.query(`update ${this.table} set ${set} where ${condition}`)
        return res
    }

    async delete(condition){
        let res = await this.request.query(`delete from ${this.table} where ${condition}`)
        return res
    }

    async custom(sql){
        let res = await this.request.query(sql)
        return res.recordset
    }
}