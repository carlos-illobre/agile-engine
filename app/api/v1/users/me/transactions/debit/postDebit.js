const { Router } = require('express')
const halson = require('halson')
const validate = require('express-validation')
const Joi = require('joi')

module.exports = Router({mergeParams: true})
.post('/v1/users/me/transactions/debit', validate({
    options: {
        allowUnknownBody: false,
    },
    body: {
        amount: Joi.number().precision(2).positive().required(),
    },
}), async (req, res, next) => {

    try {

        const amount = await req.db.Transaction.getAmount()

        if (amount < req.body.amount) {
            const error = new Error('Insuficient amount')
            error.status = 422
            throw error
        }

        const transaction = await req.db.DebitTransaction.create(req.body)

        const location = req.base
            + req.originalUrl.replace(new RegExp(req.originalUrl.split('/').pop() + '$'), transaction.id)

        res.setHeader('Location', location)

        res.status(201).json(
            halson()
            .addLink('self', location)
            .addLink('history', `${location.replace('/' + transaction.id, '')}`)
        )

    } catch(error) {
        next(error)
    }

})

