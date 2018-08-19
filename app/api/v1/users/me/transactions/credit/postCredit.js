const { Router } = require('express')
const halson = require('halson')
const validate = require('express-validation')
const Joi = require('joi')

module.exports = Router({mergeParams: true})
.post('/v1/users/me/transactions/credit', validate({
    options: {
        allowUnknownBody: false,
    },
    body: {
        amount: Joi.number().precision(2).positive().required(),
    },
}), async (req, res, next) => {

    try {

        const transaction = await req.db.CreditTransaction.create(req.body)

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

