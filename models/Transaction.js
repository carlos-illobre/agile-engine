const uuidV1 = require('uuid/v1')
const _ = require('lodash')

const history = []
let index = 1

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

    static async createDebit({ amount }) {
        const order = index++
        const total = await Transaction.getAmount()
        if (amount > total) {
            const error = new Error('Insuficient amount')
            error.type = 'DebitError'
            throw error
        }
        const transaction = new Transaction({ type: 'debit', amount })
        transaction.order = order
        return transaction.save()
    }

    static async createCredit({ amount }) {
        const order = index++
        const transaction = new Transaction({ type: 'credit', amount })
        transaction.order = order
        return transaction.save()
    }

    static async findAll() {
        return _.orderBy(history, 'order', 'asc')
    }

    static async deleteMany() {
        history.length = 0
    }

    static async getAmount() {
        return _.chain(history)
        .map(({ type, amount }) => type == 'credit' ? amount : -amount)
        .sum()
        .value()
    }

}
