const uuidV1 = require('uuid/v1')

const history = []

module.exports = class Transaction {

    constructor({ type, amount }) {
        this.id = uuidV1()
        this.type = type
        this.amount = amount
        this.effectiveDate = new Date()
    }

    async save() {
        history.push(this)
        return this
    }

    static async findAll() {
        return history.map(item => item)
    }

    static async findById(id) {
        return history.find(item => item.id == id)
    }

    static async deleteMany() {
        history.length = 0
    }

    static async count() {
        return history.length
    }

}
