const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const _ = require('lodash')

const createTestApp = require(`${process.env.PWD}/test/createTestApp.js`)

describe('GET api/v1/users/me/transactions', function () {

    beforeEach(function() {
        return createTestApp(this)
    })

    it('return 200 and the transactions history', async function() {

        const transactions = await Promise.all(
            _.range(1, 5)
            .map(n => n % 2 
                ? this.db.CreditTransaction.create({ amount: n * 1000 })
                : this.db.DebitTransaction.create({ amount: n * 1000 })
            )
        )

        const res = await request(this.app)
        .get('/api/v1/users/me/transactions')
        .expect(200)

        expect(res.body.transactions.map(item => _.pick(item, ['amount', 'type', '_links'])))
        .to.deep.equal(
            transactions.map((transaction, index) => ({
                amount: transaction.amount,
                type: index % 2 ? 'debit' : 'credit',
                _links: {
                    self: {
                        href: `${res.request.url}/${transaction.id}`,
                    },
                },
            })),
        )

        _.map(res.body.transactions, 'id').map(id => expect(id).to.be.a('string'))
        _.map(res.body.transactions, 'effectiveDate').map(date => expect(date).to.exist)

    })

})

