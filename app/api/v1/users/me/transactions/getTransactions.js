const { Router } = require('express')
const halson = require('halson')
const _ = require('lodash')

module.exports = Router({mergeParams: true})
.get('/v1/users/me/transactions', async (req, res, next) => {

    const transactions = await req.db.Transaction.findAll()

    const response = transactions.map(transaction => {
        return halson(_.pick(transaction, [
            'id',
            'amount',
            'type',
            'effectiveDate',
        ]))
        .addLink('self', `${req.base}${req.originalUrl}/${transaction.id}`)
    })

    res.json({ transactions: response })
})
