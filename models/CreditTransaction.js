const Transaction = require('./Transaction.js')

module.exports = class CreditTransaction extends Transaction {

    constructor({ amount }) {
        super({ type: 'credit', amount })
    }

    static async create({ amount }) {
        const transaction = new CreditTransaction({ amount })
        return transaction.save()
    }

}
