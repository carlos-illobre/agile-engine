const { expect } = require('chai')

const createTestApp = require(`${process.env.PWD}/test/createTestApp.js`)

describe('Transaction', function() {

    beforeEach(async function() {
        await createTestApp(this)
    })

    it('findAll', async function() {

        const creditTransaction = await this.db.Transaction.createCredit({
            amount: 1000,
        })

        const debitTransaction = await this.db.Transaction.createDebit({
            amount: 1000,
        })

        const history = await this.db.Transaction.findAll()

        expect(history).to.deep.equal([
            creditTransaction,
            debitTransaction,
        ])

    })

    it('getAmount', async function() {

        await Promise.all([
            this.db.Transaction.createCredit({
                amount: 4000,
            }),
            this.db.Transaction.createDebit({
                amount: 3000,
            }),
            this.db.Transaction.createCredit({
                amount: 2000,
            }),
            this.db.Transaction.createDebit({
                amount: 1000,
            }),
        ])

        const amount = await this.db.Transaction.getAmount()

        expect(amount).to.equal(4000 - 3000 + 2000 - 1000)

    })

})
