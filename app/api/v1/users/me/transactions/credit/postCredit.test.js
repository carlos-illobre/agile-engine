const request = require('supertest')
const _ = require('lodash')
const { expect } = require('chai')

const createTestApp = require(`${process.env.PWD}/test/createTestApp.js`)

describe('POST api/v1/users/me/transactions/credit', function () {

    beforeEach(async function() {
        await createTestApp(this)
    })

    it('return 201 if the credit financial transaction was created', async function() {
        
        const data = {
            amount: 1000.56,
        }

        const res = await request(this.app)
        .post('/api/v1/users/me/transactions/credit')
        .send(data)
        .expect(201)
        
        expect(res.header.location).to.exist

        const id = res.header.location.split('/').pop()

        expect(res.header.location)
        .to.equal(`${res.request.protocol}//${res.request.host}/api/v1/users/me/transactions/${id}`)

        expect(res.body).to.deep.equal({
            _links: {
                self: {
                    href: res.header.location,
                },
                history: {
                    href: `${res.request.protocol}//${res.request.host}/api/v1/users/me/transactions`,
                },
            },
        })

        const transaction = await this.db.Transaction.findById(id)

        expect(_.pick(transaction, Object.keys(data))).to.deep.equal(data)

    })

    it('return 500 if internal error', async function() {
        
        delete this.db.CreditTransaction

        const data = {
            amount: 1000.56,
        }

        await request(this.app)
        .post('/api/v1/users/me/transactions/credit')
        .send(data)
        .expect(500)

    })

    it('return 400 if the request has not an amount', async function() {

        const originalCount = await this.db.Transaction.count()

        await request(this.app)
        .post('/api/v1/users/me/transactions/credit')
        .send({})
        .expect(400, {
            error: {
                errors: [{
                    field: [
                        'amount',
                    ],
                    location: 'body',
                    messages: [
                        '"amount" is required',
                    ],
                    types: [
                        'any.required',
                    ],
                }],
                'status': 400,
                'statusText': 'Bad Request',
            },
            message: 'validation error',
        })

        const newCount = await this.db.Transaction.count()

        expect(originalCount).to.equals(newCount)

    })

})
