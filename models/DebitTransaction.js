const Transaction = require('./Transaction.js')

module.exports = class DebitTransaction extends Transaction {

    constructor({ amount }) {
        super({ type: 'debit', amount })
    }

    static async create({ amount }) {
        const transaction = new DebitTransaction({ amount })
        return transaction.save()
    }

}
